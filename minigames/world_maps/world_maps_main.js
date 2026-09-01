const COUNTRIES = {
	"antarctica": {
		"name": "antarctica",
		"jp": "南極",
		"large": "antarctica_large.jpg",
		"medium": "antarctica_medium.jpg",
		"small": "antarctica_small.jpg"
	},
	"arctic": {
		"name": "arctic",
		"jp": "北極",
		"large": "arctic_large.jpg",
		"medium": "arctic_medium.jpg",
		"small": "arctic_small.jpg"
	},
	"australia": {
		"name": "australia",
		"jp": "オーストラリア",
		"large": "australia_large.jpg",
		"medium": "australia_medium.jpg",
		"small": "australia_small.jpg"
	},
	"brazil": {
		"name": "brazil",
		"jp": "ブラジル",
		"large": "brazil_large.jpg",
		"medium": "brazil_medium.jpg",
		"small": "brazil_small.jpg"
	},
	"canada": {
		"name": "canada",
		"jp": "カナダ",
		"large": "canada_large.jpg",
		"medium": "canada_medium.jpg",
		"small": "canada_small.jpg"
	},
	"china": {
		"name": "china",
		"jp": "中国",
		"large": "china_large.jpg",
		"medium": "china_medium.jpg",
		"small": "china_small.jpg"
	},
	"egypt": {
		"name": "egypt",
		"jp": "エジプト",
		"large": "egypt_large.jpg",
		"medium": "egypt_medium.jpg",
		"small": "egypt_small.jpg"
	},
	"fiji": {
		"name": "fiji",
		"jp": "フィジー",
		"large": "fiji_large.jpg",
		"medium": "fiji_medium.jpg",
		"small": "fiji_small.jpg"
	},
	"finland": {
		"name": "finland",
		"jp": "フィンランド",
		"large": "finland_large.jpg",
		"medium": "finland_medium.jpg",
		"small": "finland_small.jpg"
	},
	"france": {
		"name": "france",
		"jp": "フランス",
		"large": "france_large.jpg",
		"medium": "france_medium.jpg",
		"small": "france_small.jpg"
	},
	"germany": {
		"name": "germany",
		"jp": "ドイツ",
		"large": "germany_large.jpg",
		"medium": "germany_medium.jpg",
		"small": "germany_small.jpg"
	},
	"ghana": {
		"name": "ghana",
		"jp": "ガーナ",
		"large": "ghana_large.jpg",
		"medium": "ghana_medium.jpg",
		"small": "ghana_small.jpg"
	},
	"greece": {
		"name": "greece",
		"jp": "ギリシャ",
		"large": "greece_large.jpg",
		"medium": "greece_medium.jpg",
		"small": "greece_small.jpg"
	},
	"india": {
		"name": "india",
		"jp": "インド",
		"large": "india_large.jpg",
		"medium": "india_medium.jpg",
		"small": "india_small.jpg"
	},
	"italy": {
		"name": "italy",
		"jp": "イタリア",
		"large": "italy_large.jpg",
		"medium": "italy_medium.jpg",
		"small": "italy_small.jpg"
	},
	"japan": {
		"name": "japan",
		"jp": "日本",
		"large": "japan_large.jpg",
		"medium": "japan_medium.jpg",
		"small": "japan_small.jpg"
	},
	"madagascar": {
		"name": "madagascar",
		"jp": "マダガスカル",
		"large": "madagascar_large.jpg",
		"medium": "madagascar_medium.jpg",
		"small": "madagascar_small.jpg"
	},
	"mexico": {
		"name": "mexico",
		"jp": "メキシコ",
		"large": "mexico_large.jpg",
		"medium": "mexico_medium.jpg",
		"small": "mexico_small.jpg"
	},
	"mongolia": {
		"name": "mongolia",
		"jp": "モンゴル",
		"large": "mongolia_large.jpg",
		"medium": "mongolia_medium.jpg",
		"small": "mongolia_small.jpg"
	},
	"nepal": {
		"name": "nepal",
		"jp": "ネパール",
		"large": "nepal_large.jpg",
		"medium": "nepal_medium.jpg",
		"small": "nepal_small.jpg"
	},
	"new": {
		"name": "New Zealand",
		"jp": "ニュージーランド",
		"large": "new_zealand_large.jpg",
		"medium": "new_zealand_medium.jpg",
		"small": "new_zealand_small.jpg"
	},
	"peru": {
		"name": "peru",
		"jp": "ペルー",
		"large": "peru_large.jpg",
		"medium": "peru_medium.jpg",
		"small": "peru_small.jpg"
	},
	"russia": {
		"name": "russia",
		"jp": "ロシア",
		"large": "russia_large.jpg",
		"medium": "russia_medium.jpg",
		"small": "russia_small.jpg"
	},
	"south Africa": {
		"name": "south Africa",
		"jp": "南アフリカ",
		"large": "south_africa_large.jpg",
		"medium": "south_africa_medium.jpg",
		"small": "south_africa_small.jpg"
	},
	"spain": {
		"name": "spain",
		"jp": "スペイン",
		"large": "spain_large.jpg",
		"medium": "spain_medium.jpg",
		"small": "spain_small.jpg"
	},
	"switzerland": {
		"name": "switzerland",
		"jp": "スイス",
		"large": "switzerland_large.jpg",
		"medium": "switzerland_medium.jpg",
		"small": "switzerland_small.jpg"
	},
	"tanzania": {
		"name": "tanzania",
		"jp": "タンザニア",
		"large": "tanzania_large.jpg",
		"medium": "tanzania_medium.jpg",
		"small": "tanzania_small.jpg"
	},
	"thailand": {
		"name": "thailand",
		"jp": "タイ",
		"large": "thailand_large.jpg",
		"medium": "thailand_medium.jpg",
		"small": "thailand_small.jpg"
	},
	"uk": {
		"name": "the U.K.",
		"jp": "イギリス",
		"large": "uk_large.jpg",
		"medium": "uk_medium.jpg",
		"small": "uk_small.jpg"
	},
	"america": {
		"name": "the U.S.A.",
		"jp": "アメリカ",
		"small": "usa_small.jpg",
		"medium": "usa_medium.jpg",
		"large": "usa_large.jpg"
	}
};

Object.values(COUNTRIES).forEach(function (c) {
	console.log(c.name);
	let name = c.name[0].toUpperCase() + c.name.slice(1);
	let nameJapanese = c.jp;
	let link = document.createElement("a");
	var linkText = document.createTextNode(name+"<br/>"+nameJapanese);
	link.appendChild(linkText);
	link.title = "Visit "+name+ "!";
	link.href = "img/"+c.large;
	document.body.appendChild(link);
});
