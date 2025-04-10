/**
 * Enum for handling reference loops during serialization.
 */
export enum ReferenceLoopHandling {
    Error = 0,
    Ignore = 1,
    Serialize = 2
}
