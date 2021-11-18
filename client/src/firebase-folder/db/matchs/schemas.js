export const MatchSchema = {
    name: { type: "text", default: '' },
    players: { type: "object", default: {} },
    currentTurn: { type: "number", default: 10 },
    turns: { type: "object", default: {} },
    status: { type: "text", default: 'opened' },
    winner: { type: "text", default: '' },
}

export const PlayerSchema = {
    id: { type: "text", default: '' },
    name: { type: "text", default: '' },
    score: { type: "number", default: 0 }
}

export const TurnSchema = {
    status: { type: "text", default: 'opened' },
    cardQuantity: { type: "number", default: 0 },
    players: { type: "object", default: {} },
}

export const TurnPlayerSchema = {
    playerId: { type: "text", default: '' },
    bet: { type: "number", default: 0 },
    winQuantity: { type: "number", default: 0 },
    bonusBet: { type: "number", default: 0 },
    angelQuantity: { type: "number", default: 0 },
    demonQuantity: { type: "number", default: 0 },
    bonus2: { type: "number", default: 0 },
    score: { type: "number", default: 0 },
}