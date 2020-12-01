import { Updater } from "./Particle/Updater";
import { Particles } from "../Options/Classes/Particles/Particles";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import { AnimationStatus, OutMode, RotateDirection, ShapeType, StartValueType, } from "../Enums";
import { ColorUtils, NumberUtils, Plugins, Utils } from "../Utils";
import { Infecter } from "./Particle/Infecter";
import { Mover } from "./Particle/Mover";
export class Particle {
    constructor(id, container, position, overrideOptions) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.id = id;
        this.container = container;
        this.links = [];
        this.fill = true;
        this.close = true;
        this.lastNoiseTime = 0;
        this.destroyed = false;
        this.misplaced = false;
        const pxRatio = container.retina.pixelRatio;
        const options = container.options;
        const particlesOptions = new Particles();
        particlesOptions.load(options.particles);
        const shapeType = particlesOptions.shape.type;
        const reduceDuplicates = particlesOptions.reduceDuplicates;
        this.shape = shapeType instanceof Array ? Utils.itemFromArray(shapeType, this.id, reduceDuplicates) : shapeType;
        if (overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) {
            if (overrideOptions.shape.type) {
                const overrideShapeType = overrideOptions.shape.type;
                this.shape =
                    overrideShapeType instanceof Array
                        ? Utils.itemFromArray(overrideShapeType, this.id, reduceDuplicates)
                        : overrideShapeType;
            }
            const shapeOptions = new Shape();
            shapeOptions.load(overrideOptions.shape);
            if (this.shape) {
                const shapeData = shapeOptions.options[this.shape];
                if (shapeData) {
                    this.shapeData = Utils.deepExtend({}, shapeData instanceof Array
                        ? Utils.itemFromArray(shapeData, this.id, reduceDuplicates)
                        : shapeData);
                }
            }
        }
        else {
            const shapeData = particlesOptions.shape.options[this.shape];
            if (shapeData) {
                this.shapeData = Utils.deepExtend({}, shapeData instanceof Array ? Utils.itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData);
            }
        }
        if (overrideOptions !== undefined) {
            particlesOptions.load(overrideOptions);
        }
        if (((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles) !== undefined) {
            particlesOptions.load((_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.particles);
        }
        this.fill = (_d = (_c = this.shapeData) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : this.fill;
        this.close = (_f = (_e = this.shapeData) === null || _e === void 0 ? void 0 : _e.close) !== null && _f !== void 0 ? _f : this.close;
        this.particlesOptions = particlesOptions;
        this.noiseDelay = NumberUtils.getValue(this.particlesOptions.move.noise.delay) * 1000;
        container.retina.initParticle(this);
        const color = this.particlesOptions.color;
        const sizeOptions = this.particlesOptions.size;
        const sizeValue = NumberUtils.getValue(sizeOptions) * container.retina.pixelRatio;
        const randomSize = typeof sizeOptions.random === "boolean" ? sizeOptions.random : sizeOptions.random.enable;
        this.size = {
            value: sizeValue,
        };
        this.direction = this.particlesOptions.move.direction;
        this.bubble = {
            inRange: false,
        };
        this.initialVelocity = this.calculateVelocity();
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };
        this.pathAngle = Math.atan2(this.initialVelocity.vertical, this.initialVelocity.horizontal);
        const rotateOptions = this.particlesOptions.rotate;
        this.rotate = {
            value: ((rotateOptions.random.enable ? Math.random() * 360 : rotateOptions.value) * Math.PI) / 180,
        };
        let rotateDirection = rotateOptions.direction;
        if (rotateDirection === RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);
            rotateDirection = index > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
        }
        switch (rotateDirection) {
            case RotateDirection.counterClockwise:
            case "counterClockwise":
                this.rotate.status = AnimationStatus.decreasing;
                break;
            case RotateDirection.clockwise:
                this.rotate.status = AnimationStatus.increasing;
                break;
        }
        const rotateAnimation = this.particlesOptions.rotate.animation;
        if (rotateAnimation.enable) {
            this.rotate.velocity = (rotateAnimation.speed / 360) * container.retina.reduceFactor;
            if (!rotateAnimation.sync) {
                this.rotate.velocity *= Math.random();
            }
        }
        const sizeAnimation = this.particlesOptions.size.animation;
        if (sizeAnimation.enable) {
            this.size.status = AnimationStatus.increasing;
            if (!randomSize) {
                switch (sizeAnimation.startValue) {
                    case StartValueType.min:
                        this.size.value = sizeAnimation.minimumValue * pxRatio;
                        break;
                    case StartValueType.random:
                        this.size.value = NumberUtils.randomInRange(sizeAnimation.minimumValue * pxRatio, this.size.value);
                        break;
                    case StartValueType.max:
                    default:
                        this.size.status = AnimationStatus.decreasing;
                        break;
                }
            }
            this.size.velocity =
                (((_g = this.sizeAnimationSpeed) !== null && _g !== void 0 ? _g : container.retina.sizeAnimationSpeed) / 100) *
                    container.retina.reduceFactor;
            if (!sizeAnimation.sync) {
                this.size.velocity *= Math.random();
            }
        }
        this.color = {
            value: ColorUtils.colorToHsl(color, this.id, reduceDuplicates),
        };
        const colorAnimation = this.particlesOptions.color.animation;
        if (colorAnimation.enable) {
            this.color.velocity = (colorAnimation.speed / 100) * container.retina.reduceFactor;
            if (!colorAnimation.sync) {
                this.color.velocity *= Math.random();
            }
        }
        this.position = this.calcPosition(this.container, position);
        this.initialPosition = {
            x: this.position.x,
            y: this.position.y,
        };
        this.offset = {
            x: 0,
            y: 0,
        };
        const opacityOptions = this.particlesOptions.opacity;
        const randomOpacity = typeof opacityOptions.random === "boolean" ? opacityOptions.random : opacityOptions.random.enable;
        this.opacity = {
            value: NumberUtils.getValue(opacityOptions),
        };
        const opacityAnimation = opacityOptions.animation;
        if (opacityAnimation.enable) {
            this.opacity.status = AnimationStatus.increasing;
            if (!randomOpacity) {
                switch (opacityAnimation.startValue) {
                    case StartValueType.min:
                        this.opacity.value = opacityAnimation.minimumValue;
                        break;
                    case StartValueType.random:
                        this.opacity.value = NumberUtils.randomInRange(opacityAnimation.minimumValue, this.opacity.value);
                        break;
                    case StartValueType.max:
                    default:
                        this.opacity.status = AnimationStatus.decreasing;
                        break;
                }
            }
            this.opacity.velocity = (opacityAnimation.speed / 100) * container.retina.reduceFactor;
            if (!opacityAnimation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }
        this.sides = 24;
        let drawer = container.drawers.get(this.shape);
        if (!drawer) {
            drawer = Plugins.getShapeDrawer(this.shape);
            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }
        const sideCountFunc = drawer === null || drawer === void 0 ? void 0 : drawer.getSidesCount;
        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }
        const imageShape = this.loadImageShape(container, drawer);
        if (imageShape) {
            this.image = imageShape.image;
            this.fill = imageShape.fill;
            this.close = imageShape.close;
        }
        this.stroke =
            this.particlesOptions.stroke instanceof Array
                ? Utils.itemFromArray(this.particlesOptions.stroke, this.id, reduceDuplicates)
                : this.particlesOptions.stroke;
        this.strokeWidth = this.stroke.width * container.retina.pixelRatio;
        this.strokeColor = {
            value: (_h = ColorUtils.colorToHsl(this.stroke.color)) !== null && _h !== void 0 ? _h : this.color.value,
        };
        if (typeof this.stroke.color !== "string") {
            const strokeColorAnimation = (_j = this.stroke.color) === null || _j === void 0 ? void 0 : _j.animation;
            if (strokeColorAnimation && this.strokeColor) {
                if (strokeColorAnimation.enable) {
                    this.strokeColor.velocity = (strokeColorAnimation.speed / 100) * container.retina.reduceFactor;
                    if (!strokeColorAnimation.sync) {
                        this.strokeColor.velocity = this.strokeColor.velocity * Math.random();
                    }
                }
                else {
                    this.strokeColor.velocity = 0;
                }
                if (strokeColorAnimation.enable && !strokeColorAnimation.sync && this.strokeColor.value) {
                    this.strokeColor.value.h = Math.random() * 360;
                }
            }
        }
        const lifeOptions = particlesOptions.life;
        this.lifeDelay = container.retina.reduceFactor
            ? ((NumberUtils.getValue(lifeOptions.delay) * (lifeOptions.delay.sync ? 1 : Math.random())) /
                container.retina.reduceFactor) *
                1000
            : 0;
        this.lifeDelayTime = 0;
        this.lifeDuration = container.retina.reduceFactor
            ? ((NumberUtils.getValue(lifeOptions.duration) * (lifeOptions.duration.sync ? 1 : Math.random())) /
                container.retina.reduceFactor) *
                1000
            : 0;
        this.lifeTime = 0;
        this.livesRemaining = particlesOptions.life.count;
        this.spawning = this.lifeDelay > 0;
        if (this.lifeDuration <= 0) {
            this.lifeDuration = -1;
        }
        if (this.livesRemaining <= 0) {
            this.livesRemaining = -1;
        }
        this.shadowColor = ColorUtils.colorToRgb(this.particlesOptions.shadow.color);
        this.updater = new Updater(container, this);
        this.infecter = new Infecter(container);
        this.mover = new Mover(container, this);
    }
    move(delta) {
        this.mover.move(delta);
    }
    update(delta) {
        this.updater.update(delta);
    }
    draw(delta) {
        this.container.canvas.drawParticle(this, delta);
    }
    getPosition() {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
        };
    }
    getRadius() {
        return this.bubble.radius || this.size.value;
    }
    getFillColor() {
        var _a;
        return (_a = this.bubble.color) !== null && _a !== void 0 ? _a : this.color.value;
    }
    getStrokeColor() {
        var _a, _b;
        return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : this.strokeColor.value) !== null && _b !== void 0 ? _b : this.color.value;
    }
    destroy() {
        this.destroyed = true;
        this.bubble.inRange = false;
        this.links = [];
    }
    calcPosition(container, position) {
        var _a, _b;
        for (const [, plugin] of container.plugins) {
            const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
            if (pluginPos !== undefined) {
                return Utils.deepExtend({}, pluginPos);
            }
        }
        const pos = {
            x: (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * container.canvas.size.width,
            y: (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * container.canvas.size.height,
        };
        const outMode = this.particlesOptions.move.outMode;
        if (Utils.isInArray(outMode, OutMode.bounce) || Utils.isInArray(outMode, OutMode.bounceHorizontal)) {
            if (pos.x > container.canvas.size.width - this.size.value * 2) {
                pos.x -= this.size.value;
            }
            else if (pos.x < this.size.value * 2) {
                pos.x += this.size.value;
            }
        }
        if (Utils.isInArray(outMode, OutMode.bounce) || Utils.isInArray(outMode, OutMode.bounceVertical)) {
            if (pos.y > container.canvas.size.height - this.size.value * 2) {
                pos.y -= this.size.value;
            }
            else if (pos.y < this.size.value * 2) {
                pos.y += this.size.value;
            }
        }
        return pos;
    }
    calculateVelocity() {
        const baseVelocity = NumberUtils.getParticleBaseVelocity(this);
        const res = {
            horizontal: 0,
            vertical: 0,
        };
        const moveOptions = this.particlesOptions.move;
        let rad;
        let radOffset = Math.PI / 4;
        if (typeof moveOptions.angle === "number") {
            rad = (Math.PI / 180) * moveOptions.angle;
        }
        else {
            rad = (Math.PI / 180) * moveOptions.angle.value;
            radOffset = (Math.PI / 180) * moveOptions.angle.offset;
        }
        const range = {
            left: Math.sin(radOffset + rad / 2) - Math.sin(radOffset - rad / 2),
            right: Math.cos(radOffset + rad / 2) - Math.cos(radOffset - rad / 2),
        };
        if (moveOptions.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;
            if (moveOptions.random) {
                res.horizontal += NumberUtils.randomInRange(range.left, range.right) / 2;
                res.vertical += NumberUtils.randomInRange(range.left, range.right) / 2;
            }
        }
        else {
            res.horizontal = baseVelocity.x + NumberUtils.randomInRange(range.left, range.right) / 2;
            res.vertical = baseVelocity.y + NumberUtils.randomInRange(range.left, range.right) / 2;
        }
        return res;
    }
    loadImageShape(container, drawer) {
        var _a, _b, _c, _d, _e;
        if (!(this.shape === ShapeType.image || this.shape === ShapeType.images)) {
            return;
        }
        const imageDrawer = drawer;
        const images = imageDrawer.getImages(container).images;
        const imageData = this.shapeData;
        const image = (_a = images.find((t) => t.source === imageData.src)) !== null && _a !== void 0 ? _a : images[0];
        const color = this.getFillColor();
        let imageRes;
        if (!image) {
            return;
        }
        if (image.svgData !== undefined && imageData.replaceColor && color) {
            const svgColoredData = ColorUtils.replaceColorSvg(image, color, this.opacity.value);
            const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
            const domUrl = URL || window.URL || window.webkitURL || window;
            const url = domUrl.createObjectURL(svg);
            const img = new Image();
            imageRes = {
                data: image,
                loaded: false,
                ratio: imageData.width / imageData.height,
                replaceColor: (_b = imageData.replaceColor) !== null && _b !== void 0 ? _b : imageData.replace_color,
                source: imageData.src,
            };
            img.addEventListener("load", () => {
                if (this.image) {
                    this.image.loaded = true;
                    image.element = img;
                }
                domUrl.revokeObjectURL(url);
            });
            img.addEventListener("error", () => {
                domUrl.revokeObjectURL(url);
                Utils.loadImage(imageData.src).then((img2) => {
                    if (this.image) {
                        image.element = img2.element;
                        this.image.loaded = true;
                    }
                });
            });
            img.src = url;
        }
        else {
            imageRes = {
                data: image,
                loaded: true,
                ratio: imageData.width / imageData.height,
                replaceColor: (_c = imageData.replaceColor) !== null && _c !== void 0 ? _c : imageData.replace_color,
                source: imageData.src,
            };
        }
        if (!imageRes.ratio) {
            imageRes.ratio = 1;
        }
        const fill = (_d = imageData.fill) !== null && _d !== void 0 ? _d : this.fill;
        const close = (_e = imageData.close) !== null && _e !== void 0 ? _e : this.close;
        return {
            image: imageRes,
            fill,
            close,
        };
    }
}
