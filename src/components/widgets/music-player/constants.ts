import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

export const DEFAULT_COVER_URL = "/favicon/favicon.ico";

export const LOCAL_PLAYLIST: Song[] = [
	{
		id: 1,
		title: "唱山",
		artist: "洛天依",
		cover: "/music/covers/cover1.webp",
		url: "/music/changshan.mp3",
		duration: 260,
	},
	{
		id: 2,
		title: "东京不太热",
		artist: "洛天依",
		cover: "/music/covers/cover2.webp",
		url: "/music/dongjingbutaire.mp3",
		duration: 225,
	},
	{
		id: 3,
		title: "写给我第一个喜欢的女孩的歌",
		artist: "洛天依",
		cover: "/music/covers/cover3.webp",
		url: "/music/xiegeiwo.mp3",
		duration: 182,
	},
	{
		id: 4,
		title: "一程山路",
		artist: "洛天依",
		cover: "/music/covers/cover4.webp",
		url: "/music/yichenshanlu.mp3",
		duration: 220,
	},
	{
		id: 5,
		title: "弦外知音",
		artist: "鬼卞/银临",
		cover: "/favicon/favicon.png",
		url: "/music/xianwaizhiyin.mp3",
		duration: 278,
	},
];

export const DEFAULT_SONG: Song = {
	title: "Sample Song",
	artist: "Sample Artist",
	cover: DEFAULT_COVER_URL,
	url: "",
	duration: 0,
	id: 0,
};

export const DEFAULT_METING_API =
	"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r";
export const DEFAULT_METING_ID = "14164869977";
export const DEFAULT_METING_SERVER = "netease";
export const DEFAULT_METING_TYPE = "playlist";

export const ERROR_DISPLAY_DURATION = 3000;
export const SKIP_ERROR_DELAY = 1000;
