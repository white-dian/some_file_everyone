const main = (config) => {

  // ================================================================
  // 1. Basic configuration
  // ================================================================

  config["mixed-port"] = 7890;
  config["mode"] = "rule";
  config["unified-delay"] = true;
  config["tcp-concurrent"] = true;
  config["log-level"] = "error";
  config["ipv6"] = false;
  config["allow-lan"] = false;
  config["find-process-mode"] = "always";
  config["keep-alive-interval"] = 30;
  config["keep-alive-idle"] = 30;
  config["disable-keep-alive"] = false;


  // ================================================================
  // 2. Profile
  // ================================================================

  config["profile"] = {
    "store-selected": true,
    "store-fake-ip": true
  };


  // ================================================================
  // 3. DNS
  // ================================================================

  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:53",
    "prefer-h3": false,
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "172.19.0.1/16",
    "fake-ip-filter": [
      "+.lan",
      "+.local",
      "+.localhost",
      "+.home.arpa",
      "time.*.com",
      "time.*.gov",
      "pool.ntp.org",
      "+.push.apple.com",
      "mesu.apple.com",
      "swscan.apple.com",
      "captive.apple.com",
      "connectivitycheck.gstatic.com",
      "connectivitycheck.android.com",
      "www.msftconnecttest.com",
      "www.msftncsi.com"
    ],
    "default-nameserver": [
      "223.5.5.5",
      "119.29.29.29"
    ],
    "nameserver": [
      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"
    ],
    "nameserver-policy": {
      "geosite:cn": [
        "https://dns.alidns.com/dns-query",
        "https://doh.pub/dns-query"
      ],
      "geosite:private": [
        "https://dns.alidns.com/dns-query",
        "https://doh.pub/dns-query"
      ],
      "geolocation-!cn": [
        "https://cloudflare-dns.com/dns-query",
        "https://dns.google/dns-query"
      ]
    },
    "proxy-server-nameserver": [
      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"
    ],
    "direct-nameserver": [
      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"
    ],
    "fallback": [
      "https://cloudflare-dns.com/dns-query",
      "https://dns.google/dns-query"
    ],
    "fallback-filter": {
      "geoip": true,
      "geoip-code": "CN",
      "geosite": [
        "gfw"
      ],
      "domain": [
        "+.google.com",
        "+.googleapis.com",
        "+.googlevideo.com",
        "+.youtube.com",
        "+.github.com",
        "+.openai.com",
        "+.chatgpt.com",
        "+.anthropic.com",
        "+.claude.ai"
      ]
    }
  };


  // ================================================================
  // 4. TUN
  // ================================================================

  config["tun"] = {
    "enable": true,
    "device": "FlClash",
    "stack": "gvisor",
    "dns-hijack": [
      "0.0.0.0:53"
    ],
    "auto-route": true,
    "auto-detect-interface": false,
    "strict-route": true,
    "mtu": 1280,
    "inet4-address": [
      "172.19.0.1/30"
    ],
    "auto-redirect": false,
    "disable-icmp-forwarding": true
  };


  // ================================================================
  // 5. Sniffer
  // ================================================================

  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "force-dns-mapping": true,
    "override-destination": true,
    "sniff": {
      "HTTP": {
        "ports": [
          80,
          "8080-8880"
        ]
      },
      "TLS": {
        "ports": [
          443,
          8443
        ]
      },
      "QUIC": {
        "ports": [
          443,
          8443
        ]
      }
    },
    "skip-domain": [
      "+.push.apple.com",
      "+.mijia.cloud"
    ]
  };


  // ================================================================
  // 6. NTP
  // ================================================================

  config["ntp"] = {
    "enable": true,
    "write-to-system": false,
    "server": "time.apple.com",
    "port": 123,
    "interval": 30
  };


  // ================================================================
  // 7. Original airport proxies & groups
  // ================================================================

  const originalProxies = Array.isArray(config["proxies"])
    ? config["proxies"]
    : [];

  const proxyNames = [];
  originalProxies.forEach((proxy) => {
    if (proxy && proxy.name) {
      proxyNames.push(proxy.name);
    }
  });

  const originalGroups = Array.isArray(config["proxy-groups"])
    ? config["proxy-groups"]
    : [];


  // ================================================================
  // 8. Icons & Managed groups
  // ================================================================

  const iconBaseURL =
    "https://cdn.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/icons/";

  const groupIcons = {
    "一键代理": "Proxy.png",
    "国内直连": "China.png",
    "AI": "AI.png",
    "X / 社交": "Proxy.png",
    "YouTube": "YouTube.png",
    "Google": "Google.png",
    "GitHub": "GitHub.png",
    "网络检测": "Network-test.png",
    "Netflix": "Netflix.png",
    "Spotify": "Spotify.png",
    "Steam": "Steam.png",
    "Telegram": "Telegram.png",
    "TikTok": "TikTok.png",
    "Apple": "Apple.png",
    "Microsoft": "Microsoft.png",
    "香港": "Hong_Kong.png",
    "台湾": "Taiwan.png",
    "日本": "Japan.png",
    "新加坡": "Singapore.png",
    "韩国": "Korea.png",
    "美国": "United_States.png",
    "加拿大": "Other.png",
    "英国": "Other.png",
    "其他地区": "Other.png"
  };

  function getGroupIcon(name) {
    if (!groupIcons[name]) {
      return undefined;
    }
    return iconBaseURL + groupIcons[name];
  }

  const managedGroups = {
    "一键代理": true,
    "国内直连": true,
    "AI": true,
    "X / 社交": true,
    "YouTube": true,
    "Google": true,
    "GitHub": true,
    "网络检测": true,
    "Netflix": true,
    "Spotify": true,
    "Steam": true,
    "Telegram": true,
    "TikTok": true,
    "Apple": true,
    "Microsoft": true,
    "三星服务": true,
    "香港": true,
    "台湾": true,
    "日本": true,
    "新加坡": true,
    "韩国": true,
    "美国": true,
    "加拿大": true,
    "英国": true,
    "其他地区": true
  };


  // ================================================================
  // 9. Preserve airport basic groups
  // ================================================================

  const builtinTargets = {
    "DIRECT": true,
    "REJECT": true,
    "REJECT-DROP": true,
    "PASS": true,
    "COMPATIBLE": true,
    "GLOBAL": true
  };

  function isBusinessGroupName(name) {
    if (!name) return false;
    const text = String(name);
    const patterns = [
      /ai/i, /openai/i, /chatgpt/i, /claude/i, /gemini/i,
      /netflix/i, /disney/i, /disney\+/i, /youtube/i, /google/i,
      /github/i, /spotify/i, /steam/i, /tiktok/i, /telegram/i,
      /twitter/i, /x\.com/i, /facebook/i, /instagram/i,
      /流媒体/i, /媒体/i, /影音/i, /视频/i,
      /游戏/i, /游戏专用/i, /机场专用/i, /节点分流/i
    ];
    return patterns.some((re) => re.test(text));
  }

  function isAutoSelectGroup(name) {
    if (!name) return false;
    return /自动选择/i.test(name) ||
      /auto[\s_-]*select/i.test(name) ||
      /auto[\s_-]*test/i.test(name) ||
      /测速/i.test(name);
  }

  function isFailoverGroup(name) {
    if (!name) return false;
    return /故障转移/i.test(name) ||
      /failover/i.test(name) ||
      /fallback/i.test(name);
  }

  function isAllNodeName(name) {
    if (!name) return false;
    return /全部节点/i.test(name) ||
      /所有节点/i.test(name) ||
      /全部/i.test(name) ||
      /all[\s_-]*nodes?/i.test(name) ||
      /all[\s_-]*proxies?/i.test(name);
  }

  function getProxyComposition(group) {
    const result = { total: 0, actualNodes: 0, groups: 0, builtin: 0, unknown: 0 };
    if (!group || !Array.isArray(group.proxies)) return result;
    result.total = group.proxies.length;
    group.proxies.forEach((item) => {
      if (!item) return;
      if (proxyNames.indexOf(item) !== -1) {
        result.actualNodes++;
        return;
      }
      if (builtinTargets[item]) {
        result.builtin++;
        return;
      }
      if (originalGroups.some((g) => g && g.name === item)) {
        result.groups++;
        return;
      }
      result.unknown++;
    });
    return result;
  }

  function isAllNodesGroup(group) {
    if (!group || !group.name) return false;
    const name = String(group.name);
    if (isAllNodeName(name)) return true;
    if (isBusinessGroupName(name)) return false;
    const composition = getProxyComposition(group);
    if (composition.total === 0 || composition.actualNodes < 2) return false;
    if (composition.actualNodes / composition.total < 0.3) return false;
    if (composition.groups > 0) return composition.actualNodes >= 5;
    return true;
  }

  const finalPreservedGroups = [];
  originalGroups.forEach((group) => {
    if (!group || !group.name || managedGroups[group.name]) return;
    const isBasic =
      isAutoSelectGroup(group.name) ||
      isFailoverGroup(group.name) ||
      isAllNodesGroup(group);
    if (!isBasic) return;

    const copied = JSON.parse(JSON.stringify(group));
    delete copied["hidden"];

    if (isAutoSelectGroup(copied.name)) {
      copied.type = "url-test";
      copied.proxies = proxyNames.slice();
      copied.url = "https://www.gstatic.com/generate_204";
      copied.interval = 300;
      copied.timeout = 5000;
      copied.tolerance = 50;
      copied.lazy = true;
      copied["max-failed-times"] = 3;
      copied["expected-status"] = 204;
      delete copied["disable-udp"];
      delete copied["strategy"];
    }

    finalPreservedGroups.push(copied);
  });


  // ================================================================
  // 10. Remote Rule Providers
  // ================================================================

  const ruleBaseURL =
    "https://cdn.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/";

  function createRuleProvider(filename) {
    return {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "url": ruleBaseURL + filename,
      "path": "./rules/" + filename,
      "interval": 86400
    };
  }

  config["rule-providers"] = {
    "AI": createRuleProvider("ai.yaml"),
    "YouTube": createRuleProvider("youtube.yaml"),
    "Google": createRuleProvider("google.yaml"),
    "GitHub": createRuleProvider("github.yaml"),
    "Netflix": createRuleProvider("netflix.yaml"),
    "Spotify": createRuleProvider("spotify.yaml"),
    "Steam": createRuleProvider("steam.yaml"),
    "Telegram": createRuleProvider("telegram.yaml"),
    "TikTok": createRuleProvider("tiktok.yaml"),
    "Apple": createRuleProvider("apple.yaml"),
    "Microsoft": createRuleProvider("microsoft.yaml"),
    "NetworkTest": createRuleProvider("network-test.yaml")
  };


  // ================================================================
  // 11. Region detection & groups
  // ================================================================

  const regionPatterns = {
    "香港": [/香港/i, /\bHK\b/i, /HKG/i, /Hong\s*Kong/i, /HongKong/i],
    "台湾": [/台湾/i, /台灣/i, /\bTW\b/i, /TPE/i, /KHH/i, /TSA/i, /Taiwan/i, /Taipei/i],
    "日本": [/日本/i, /\bJP\b/i, /NRT/i, /HND/i, /KIX/i, /CTS/i, /FUK/i, /Japan/i, /Tokyo/i, /Osaka/i],
    "新加坡": [/新加坡/i, /\bSG\b/i, /SIN/i, /XSP/i, /Singapore/i],
    "韩国": [/韩国/i, /韓國/i, /\bKR\b/i, /ICN/i, /GMP/i, /PUS/i, /Korea/i, /Seoul/i],
    "美国": [/美国/i, /\bUS\b/i, /\bUSA\b/i, /LAX/i, /SFO/i, /JFK/i, /SJC/i, /United\s*States/i, /America/i, /Los\s*Angeles/i, /San\s*Jose/i, /New\s*York/i],
    "加拿大": [/加拿大/i, /Canada/i, /Toronto/i, /Vancouver/i, /Montreal/i],
    "英国": [/英国/i, /UK/i, /United\s*Kingdom/i, /England/i, /London/i, /Manchester/i]
  };

  function detectRegion(proxyName) {
    for (const region in regionPatterns) {
      if (!Object.prototype.hasOwnProperty.call(regionPatterns, region)) continue;
      if (regionPatterns[region].some((re) => re.test(proxyName))) {
        return region;
      }
    }
    return "其他地区";
  }

  const regionOrder = [
    "香港", "台湾", "日本", "新加坡", "韩国", "美国", "加拿大", "英国", "其他地区"
  ];

  const regionNodes = {};
  regionOrder.forEach((r) => { regionNodes[r] = []; });

  originalProxies.forEach((proxy) => {
    if (!proxy || !proxy.name) return;
    const region = detectRegion(String(proxy.name));
    regionNodes[region].push(proxy.name);
  });

  const regionGroups = [];
  regionOrder.forEach((region) => {
    const nodes = regionNodes[region];
    if (!nodes || nodes.length === 0) return;

    const group = {
      "name": region,
      "type": "url-test",
      "proxies": nodes,
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "timeout": 5000,
      "tolerance": 50,
      "lazy": true,
      "max-failed-times": 3,
      "expected-status": 204
    };

    const icon = getGroupIcon(region);
    if (icon) group["icon"] = icon;
    regionGroups.push(group);
  });

  const availableRegions = regionGroups.map((g) => g.name);


  // ================================================================
  // 12. Business & Special groups
  // ================================================================

  const domesticDirectGroup = {
    "name": "国内直连",
    "type": "select",
    "proxies": ["DIRECT"]
  };
  if (getGroupIcon("国内直连")) domesticDirectGroup["icon"] = getGroupIcon("国内直连");

  const mainSelector = {
    "name": "一键代理",
    "type": "select",
    "proxies": availableRegions.concat(["国内直连"])
  };
  if (getGroupIcon("一键代理")) mainSelector["icon"] = getGroupIcon("一键代理");

  function createBusinessGroup(name) {
    const group = {
      "name": name,
      "type": "select",
      "proxies": availableRegions.concat(["国内直连"])
    };
    const icon = getGroupIcon(name);
    if (icon) group["icon"] = icon;
    return group;
  }

  const businessGroups = [
    createBusinessGroup("AI"),
    createBusinessGroup("X / 社交"),
    createBusinessGroup("YouTube"),
    createBusinessGroup("Google"),
    createBusinessGroup("GitHub"),
    createBusinessGroup("Netflix"),
    createBusinessGroup("Spotify"),
    createBusinessGroup("Steam"),
    createBusinessGroup("Telegram"),
    createBusinessGroup("TikTok"),
    createBusinessGroup("Apple"),
    createBusinessGroup("Microsoft"),
    createBusinessGroup("网络检测")
  ];

  const samsungGroup = {
    "name": "三星服务",
    "type": "select",
    "proxies": ["国内直连"].concat(availableRegions)
  };

  config["proxy-groups"] = finalPreservedGroups
    .concat(businessGroups)
    .concat(regionGroups)
    .concat([
      domesticDirectGroup,
      samsungGroup,
      mainSelector
    ]);


  // ================================================================
  // 13. Routing rules
  // ================================================================

  config["rules"] = [

    // ==============================================================
    // 【自定义网址单独配置区】（最高优先级，写在这里的规则会最先匹配）
    //
    // 语法格式：
    //   "类型,目标,策略组"
    //
    // 常用“类型”说明：
    //   1. DOMAIN-SUFFIX ：匹配该域名及其所有子域名
    //      例：写 "DOMAIN-SUFFIX,example.com,..."
    //          会同时匹配 example.com、www.example.com、api.example.com
    //   2. DOMAIN        ：仅精确匹配某一个完整域名
    //      例：写 "DOMAIN,sub.example.com,..."
    //          只匹配 sub.example.com，不影响其他子域名
    //   3. DOMAIN-KEYWORD：只要域名中包含某个关键词就匹配（慎用，范围较宽）
    //      例：写 "DOMAIN-KEYWORD,pixiv,..."
    //
    // 常用“策略组”说明（必须与上面 proxy-groups 里的 name 完全一致）：
    //   - 国内直连      ：不走代理，直接连接
    //   - 一键代理      ：走主代理策略组
    //   - AI / X / 社交 / YouTube / Google / GitHub / Netflix / Spotify /
    //     Steam / Telegram / TikTok / Apple / Microsoft / 三星服务
    //   - 地区分组名    ：如 "香港"、"日本"、"新加坡"、"美国"（前提是你的机场有该地区节点）
    //   - REJECT        ：直接拦截/拒绝连接
    //
    // 注意事项：
    //   - 每条规则必须用英文双引号 "..." 包裹，末尾加英文逗号 ,
    //   - 以 // 开头的行是注释，不会生效
    //
    // --- 样例（默认前面带 // 注释，需要时去掉 // 并修改域名即可）---
    // "DOMAIN-SUFFIX,example.com,国内直连",        // 强制某个网站走直连
    // "DOMAIN-SUFFIX,pixiv.net,日本",            // 强制某个网站走指定地区（如“日本”）
    // "DOMAIN-SUFFIX,discord.com,一键代理",      // 强制某个网站走一键代理
    // "DOMAIN,login.example.com,AI",             // 仅让单个完整域名走指定服务组
    // ==============================================================
    "DOMAIN-SUFFIX,gemini.google.com,日本", 

    // 明确直连的常见国内/本地/特定域名
    "DOMAIN-SUFFIX,lan,国内直连",
    "DOMAIN-SUFFIX,local,国内直连",
    "DOMAIN-SUFFIX,localhost,国内直连",
    "DOMAIN,cn-ms.galaxyappstore.com,国内直连",
    "IP-CIDR,127.0.0.0/8,国内直连,no-resolve",
    "IP-CIDR,10.0.0.0/8,国内直连,no-resolve",
    "IP-CIDR,172.16.0.0/12,国内直连,no-resolve",
    "IP-CIDR,192.168.0.0/16,国内直连,no-resolve",

    // 三星服务
    "DOMAIN-SUFFIX,samsung.com,三星服务",
    "DOMAIN-SUFFIX,samsung.com.cn,三星服务",
    "DOMAIN-SUFFIX,samsungapps.com,三星服务",
    "DOMAIN-SUFFIX,samsungdm.com,三星服务",
    "DOMAIN-SUFFIX,samsungcloud.com,三星服务",
    "DOMAIN-SUFFIX,samsungknox.com,三星服务",
    "DOMAIN-SUFFIX,samsungmembers.com,三星服务",

    // X / 社交
    "DOMAIN-SUFFIX,x.com,X / 社交",
    "DOMAIN-SUFFIX,twitter.com,X / 社交",
    "DOMAIN-SUFFIX,twimg.com,X / 社交",
    "DOMAIN-SUFFIX,t.co,X / 社交",
    "DOMAIN-SUFFIX,pscp.tv,X / 社交",
    "DOMAIN-SUFFIX,periscope.tv,X / 社交",

    // 服务规则集（YouTube 需在 Google 之前）
    "RULE-SET,NetworkTest,网络检测",
    "RULE-SET,AI,AI",
    "RULE-SET,YouTube,YouTube",
    "RULE-SET,Google,Google",
    "RULE-SET,GitHub,GitHub",
    "RULE-SET,Netflix,Netflix",
    "RULE-SET,Spotify,Spotify",
    "RULE-SET,Steam,Steam",
    "RULE-SET,Telegram,Telegram",
    "RULE-SET,TikTok,TikTok",
    "RULE-SET,Apple,Apple",
    "RULE-SET,Microsoft,Microsoft",

    // 私有与国内分流
    "GEOSITE,private,国内直连",
    "GEOIP,private,国内直连,no-resolve",
    "GEOSITE,cn,国内直连",
    "GEOIP,cn,国内直连,no-resolve",

    // 兜底规则
    "MATCH,一键代理"
  ];

  return config;
};