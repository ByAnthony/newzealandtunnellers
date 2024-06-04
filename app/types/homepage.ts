import { Articles } from './article';
import { TunnellerImage } from './tunneller';

export type Homepage = {
    tunnellers: TunnellerImage[],
    historyChapters: Articles[],
}
