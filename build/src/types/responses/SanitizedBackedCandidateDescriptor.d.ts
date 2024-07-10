export interface ISanitizedBackedCandidateDescriptor {
    paraId: string;
    relayParent: `0x${string}`;
    collator: `0x${string}`;
    persistedValidationDataHash: `0x${string}`;
    povHash: `0x${string}`;
    erasureRoot: `0x${string}`;
    signature: `0x${string}`;
    paraHead: `0x${string}`;
    validationCodeHash: `0x${string}`;
}
