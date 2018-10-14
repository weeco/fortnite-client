export interface IGameNews {
  _title: string;
  _activeDate: string;
  lastModified: string;
  _locale: string;
  survivalmessage: IAthenamessage;
  athenamessage: IAthenamessage;
  subgameselectdata: ISubgameselectdata;
  savetheworldnews: IAthenamessage;
  battleroyalenews: IBattleroyalenews;
  loginmessage: IAthenamessage;
  playlistimages: IAthenamessage;
  emergencynotice: IAthenamessage;
  battlepassaboutmessages: IAthenamessage;
  playlistinformation: IPlaylistInformation;
  tournamentinformation: IAthenamessage;
}

export interface IAthenamessage {
  _title: string;
  overrideablemessage?: ILoginmessage;
  _activeDate: string;
  lastModified: string;
  _locale: string;
  news?: IAthenamessageNews;
  loginmessage?: ILoginmessage;
  playlistimages?: IPlaylistimages;
  tournament_info?: ITournamentInfo;
}

export interface ILoginmessage {
  _type: string;
  message: ILoginmessageMessage;
}

export interface ILoginmessageMessage {
  image?: string;
  _type: MessageType;
  title: string;
  body: string;
}

export enum MessageType {
  CommonUISimpleMessageBase = 'CommonUI Simple Message Base'
}

export interface IAthenamessageNews {
  _type: string;
  messages: IMessageElement[];
}

export interface IMessageElement {
  layout?: string;
  image?: string;
  hidden: boolean;
  _type: MessageType;
  title: string;
  body: string;
  spotlight: boolean;
  messagetype?: PromotionType;
  adspace?: Adspace;
}

export enum Adspace {
  New = 'NEW!',
  ComingSoon = 'COMING SOON!'
}

export enum PromotionType {
  Normal = 'normal',
  Sale = 'sale'
}

export interface IPlaylistimages {
  images: Image[];
  _type: string;
}

export interface Image {
  image: string;
  _type: ImageType;
  playlistname: string;
}

export enum ImageType {
  PlaylistImageEntry = 'PlaylistImageEntry'
}

export interface ITournamentInfo {
  tournaments: ITournament[];
  _type: string;
}

export interface ITournament {
  pin_score_requirement: number;
  title_color: string;
  background_text_color: string;
  background_right_color: string;
  poster_back_image: string;
  _type: string;
  pin_earned_text: string;
  tournament_display_id: string;
  highlight_color: string;
  schedule_info: string;
  primary_color: string;
  flavor_description: string;
  poster_front_image: string;
  short_format_title: string;
  title_line_2: string;
  title_line_1: string;
  shadow_color: string;
  details_description: string;
  background_left_color: string;
  long_format_title: string;
  poster_fade_color: string;
  secondary_color: string;
  base_color: string;
  loading_screen_image?: string;
  playlist_tile_image?: string;
}

export interface IBattleroyalenews {
  news: IBattleroyalenewsNews;
  _title: string;
  header: string;
  style: Style;
  _activeDate: string;
  lastModified: string;
  _locale: string;
}

export interface IBattleroyalenewsNews {
  platform_messages: IPlatformMessage[];
  _type: string;
  messages: IMessageElement[];
}

export interface IPlatformMessage {
  _type: string;
  message: IMessageElement;
  platform: string;
}

export enum Style {
  HighStakes = 'HighStakes',
  None = 'None'
}

export interface IPlaylistInformation {
  frontend_matchmaking_header_style: Style;
  _title: string;
  frontend_matchmaking_header_text: string;
  playlist_info: IPlaylistInfo;
  _activeDate: string;
  lastModified: string;
  _locale: string;
}

export interface IPlaylistInfo {
  _type: string;
  playlists: IPlaylist[];
}

export interface IPlaylist {
  image: string;
  playlist_name: string;
  _type: PlaylistType;
  special_border?: Style;
  violator?: string;
  description?: string;
}

export enum PlaylistType {
  FortPlaylistInfo = 'FortPlaylistInfo'
}

export interface ISubgameselectdata {
  saveTheWorldUnowned: IBattleRoyale;
  _title: string;
  battleRoyale: IBattleRoyale;
  saveTheWorld: IBattleRoyale;
  _activeDate: string;
  lastModified: string;
  _locale: string;
}

export interface IBattleRoyale {
  _type: string;
  message: IMessageElement;
}
