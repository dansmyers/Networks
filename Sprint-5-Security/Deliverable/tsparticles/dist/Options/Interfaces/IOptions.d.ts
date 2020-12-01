import type { IInteractivity } from "./Interactivity/IInteractivity";
import type { IParticles } from "./Particles/IParticles";
import type { IBackgroundMask } from "./BackgroundMask/IBackgroundMask";
import type { IBackground } from "./Background/IBackground";
import type { IInfection } from "./Infection/IInfection";
import type { SingleOrMultiple } from "../../Types";
import type { ITheme } from "./Theme/ITheme";
import type { IBackgroundMode } from "./BackgroundMode/IBackgroundMode";
import type { IMotion } from "./Motion/IMotion";
import type { IManualParticle } from "./IManualParticle";
export interface IOptions {
    autoPlay: boolean;
    background: IBackground;
    backgroundMask: IBackgroundMask;
    backgroundMode: IBackgroundMode;
    detectRetina: boolean;
    fps_limit: number;
    fpsLimit: number;
    infection: IInfection;
    interactivity: IInteractivity;
    manualParticles: IManualParticle[];
    motion: IMotion;
    particles: IParticles;
    pauseOnBlur: boolean;
    pauseOnOutsideViewport: boolean;
    preset?: SingleOrMultiple<string>;
    retina_detect: boolean;
    themes: ITheme[];
}
