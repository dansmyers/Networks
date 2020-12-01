import type { IOptions } from "../Interfaces/IOptions";
import { Interactivity } from "./Interactivity/Interactivity";
import { Particles } from "./Particles/Particles";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import type { RecursivePartial } from "../../Types";
import { Background } from "./Background/Background";
import { Infection } from "./Infection/Infection";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { Theme } from "./Theme/Theme";
import { BackgroundMode } from "./BackgroundMode/BackgroundMode";
import { Motion } from "./Motion/Motion";
import { ManualParticle } from "./ManualParticle";
export declare class Options implements IOptions, IOptionLoader<IOptions> {
    get fps_limit(): number;
    set fps_limit(value: number);
    get retina_detect(): boolean;
    set retina_detect(value: boolean);
    autoPlay: boolean;
    background: Background;
    backgroundMask: BackgroundMask;
    backgroundMode: BackgroundMode;
    detectRetina: boolean;
    fpsLimit: number;
    infection: Infection;
    interactivity: Interactivity;
    manualParticles: ManualParticle[];
    motion: Motion;
    particles: Particles;
    pauseOnBlur: boolean;
    pauseOnOutsideViewport: boolean;
    preset?: string | string[];
    themes: Theme[];
    constructor();
    load(data?: RecursivePartial<IOptions>): void;
    setTheme(name?: string): void;
    private importPreset;
}
