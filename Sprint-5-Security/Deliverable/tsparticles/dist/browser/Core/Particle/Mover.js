import { NumberUtils, Utils } from "../../Utils";
import { HoverMode } from "../../Enums";
export class Mover {
    constructor(container, particle) {
        this.container = container;
        this.particle = particle;
    }
    move(delta) {
        const particle = this.particle;
        particle.bubble.inRange = false;
        particle.links = [];
        for (const [, plugin] of this.container.plugins) {
            if (particle.destroyed) {
                break;
            }
            if (plugin.particleUpdate) {
                plugin.particleUpdate(particle, delta);
            }
        }
        if (particle.destroyed) {
            return;
        }
        this.moveParticle(delta);
        this.moveParallax();
    }
    moveParticle(delta) {
        var _a, _b;
        const particle = this.particle;
        const particlesOptions = particle.particlesOptions;
        if (!particlesOptions.move.enable) {
            return;
        }
        const container = this.container;
        const slowFactor = this.getProximitySpeedFactor();
        const baseSpeed = ((_a = particle.moveSpeed) !== null && _a !== void 0 ? _a : container.retina.moveSpeed) * container.retina.reduceFactor;
        const maxSize = (_b = particle.sizeValue) !== null && _b !== void 0 ? _b : container.retina.sizeValue;
        const sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1;
        const moveSpeed = (baseSpeed / 2) * sizeFactor * slowFactor * delta.factor;
        this.applyNoise(delta);
        const gravityOptions = particlesOptions.move.gravity;
        if (gravityOptions.enable) {
            particle.velocity.vertical += (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
        }
        const velocity = {
            horizontal: particle.velocity.horizontal * moveSpeed,
            vertical: particle.velocity.vertical * moveSpeed,
        };
        if (gravityOptions.enable && velocity.vertical >= gravityOptions.maxSpeed && gravityOptions.maxSpeed > 0) {
            velocity.vertical = gravityOptions.maxSpeed;
            particle.velocity.vertical = velocity.vertical / moveSpeed;
        }
        particle.position.x += velocity.horizontal;
        particle.position.y += velocity.vertical;
        if (particlesOptions.move.vibrate) {
            particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
            particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
        }
        const initialPosition = particle.initialPosition;
        const initialDistance = NumberUtils.getDistance(initialPosition, particle.position);
        if (particle.maxDistance) {
            if (initialDistance >= particle.maxDistance && !particle.misplaced) {
                particle.misplaced = initialDistance > particle.maxDistance;
                particle.velocity.horizontal = particle.velocity.vertical / 2 - particle.velocity.horizontal;
                particle.velocity.vertical = particle.velocity.horizontal / 2 - particle.velocity.vertical;
            }
            else if (initialDistance < particle.maxDistance && particle.misplaced) {
                particle.misplaced = false;
            }
            else if (particle.misplaced) {
                if ((particle.position.x < initialPosition.x && particle.velocity.horizontal < 0) ||
                    (particle.position.x > initialPosition.x && particle.velocity.horizontal > 0)) {
                    particle.velocity.horizontal *= -Math.random();
                }
                if ((particle.position.y < initialPosition.y && particle.velocity.vertical < 0) ||
                    (particle.position.y > initialPosition.y && particle.velocity.vertical > 0)) {
                    particle.velocity.vertical *= -Math.random();
                }
            }
        }
    }
    applyNoise(delta) {
        const particle = this.particle;
        const particlesOptions = particle.particlesOptions;
        const noiseOptions = particlesOptions.move.noise;
        const noiseEnabled = noiseOptions.enable;
        if (!noiseEnabled) {
            return;
        }
        const container = this.container;
        if (particle.lastNoiseTime <= particle.noiseDelay) {
            particle.lastNoiseTime += delta.value;
            return;
        }
        const noise = container.noise.generate(particle);
        particle.velocity.horizontal += Math.cos(noise.angle) * noise.length;
        particle.velocity.horizontal = NumberUtils.clamp(particle.velocity.horizontal, -1, 1);
        particle.velocity.vertical += Math.sin(noise.angle) * noise.length;
        particle.velocity.vertical = NumberUtils.clamp(particle.velocity.vertical, -1, 1);
        particle.lastNoiseTime -= particle.noiseDelay;
    }
    moveParallax() {
        const container = this.container;
        const options = container.options;
        if (Utils.isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }
        const particle = this.particle;
        const parallaxForce = options.interactivity.events.onHover.parallax.force;
        const mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const canvasCenter = {
            x: container.canvas.size.width / 2,
            y: container.canvas.size.height / 2,
        };
        const parallaxSmooth = options.interactivity.events.onHover.parallax.smooth;
        const factor = particle.getRadius() / parallaxForce;
        const tmp = {
            x: (mousePos.x - canvasCenter.x) * factor,
            y: (mousePos.y - canvasCenter.y) * factor,
        };
        particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth;
        particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth;
    }
    getProximitySpeedFactor() {
        const container = this.container;
        const options = container.options;
        const active = Utils.isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);
        if (!active) {
            return 1;
        }
        const mousePos = this.container.interactivity.mouse.position;
        if (!mousePos) {
            return 1;
        }
        const particlePos = this.particle.getPosition();
        const dist = NumberUtils.getDistance(mousePos, particlePos);
        const radius = container.retina.slowModeRadius;
        if (dist > radius) {
            return 1;
        }
        const proximityFactor = dist / radius || 0;
        const slowFactor = options.interactivity.modes.slow.factor;
        return proximityFactor / slowFactor;
    }
}
