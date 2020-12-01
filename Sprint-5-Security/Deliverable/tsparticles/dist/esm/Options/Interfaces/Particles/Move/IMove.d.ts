import type { IAttract } from "./IAttract";
import type { MoveDirection, MoveDirectionAlt, OutMode, OutModeAlt } from "../../../../Enums";
import type { ITrail } from "./ITrail";
import type { INoise } from "./Noise/INoise";
import type { IMoveAngle } from "./IMoveAngle";
import type { IMoveGravity } from "./IMoveGravity";
import type { IOutModes } from "./IOutModes";
export interface IMove {
    bounce: boolean;
    collisions: boolean;
    out_mode: OutMode | keyof typeof OutMode | OutModeAlt;
    outMode: OutMode | keyof typeof OutMode | OutModeAlt;
    angle: number | IMoveAngle;
    attract: IAttract;
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    distance: number;
    enable: boolean;
    gravity: IMoveGravity;
    noise: INoise;
    outModes: IOutModes | OutMode | keyof typeof OutMode | OutModeAlt;
    random: boolean;
    size: boolean;
    speed: number;
    straight: boolean;
    trail: ITrail;
    vibrate: boolean;
    warp: boolean;
}
