export type SystemTextContent= {
    TO_FRONTSTAGE: string;
}

type SystemTextContentSet = {
    ENGLISH: SystemTextContent;
    CHINESE: SystemTextContent;
    JAPANESE: SystemTextContent;
    PORTUGUESE: SystemTextContent;
}

const SYSTEM_TEXT_CONTENT: SystemTextContentSet = {
    ENGLISH: {
        TO_FRONTSTAGE: 'To Frontstage',
    },
    CHINESE: {
        TO_FRONTSTAGE: '回到前台',
    },
    JAPANESE: {
        TO_FRONTSTAGE: 'フロントステージに戻る',
    },
    PORTUGUESE: {
        TO_FRONTSTAGE: 'Voltar para o Frontstage',
    },
}

export { SYSTEM_TEXT_CONTENT }