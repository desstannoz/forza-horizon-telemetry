/// <reference types="node" />
export { ForzaServerEvent } from './types/ForzaServerEvent';
export { DataOut } from './types/DataOut';
import { ForzaServerEvent } from './types/ForzaServerEvent';
import { Socket } from 'dgram';
export default class ForzaServer {
    #private;
    server: Socket;
    port: number;
    constructor(port: number);
    bind(...args: any[]): void;
    close(onClosed?: () => void): void;
    on(event: ForzaServerEvent, onEvent: (...args: any[]) => any): void;
}
