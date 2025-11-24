import { CompanyInfo, ServiceCategory, ServiceType, TeamMember } from './types';

/**
 * ==========================================
 * 编辑指南 (EDITING GUIDE)
 * ==========================================
 * 您可以在此处修改网站的所有文字和图片连接。
 * You can replace the image URLs with your own hosted images.
 * ==========================================
 */

export const COMPANY_INFO: CompanyInfo = {
  name: "译道佳华",
  slogan: "为热爱而生，为您而来",
  phones: ["15985194981", "13984832580"],
  description: "贵州译道佳华文化发展有限公司，前身是一家经营10多年的品牌设计工作室。现以视觉传达为核心，协助各政府、机构、企业宣传推广的创意型文化发展公司。",
  locations: ["贵州 · 贵阳"],
  logoUrl: "https://cdn-icons-png.flaticon.com/512/5977/5977591.png" // Placeholder logo
};

// 核心人员简介 (基于文档第6页)
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "t1",
    name: "主理人 A",
    role: "导演 / 品牌设计师",
    imageUrl: "https://picsum.photos/400/500?random=101",
    tags: ["导演", "设计", "主理人"]
  },
  {
    id: "t2",
    name: "主理人 B",
    role: "导演 / 摄影指导 / 航拍",
    imageUrl: "https://picsum.photos/400/500?random=102",
    tags: ["摄影", "航拍", "主理人"]
  },
  {
    id: "t3",
    name: "主理人 C",
    role: "独立音乐制作人",
    imageUrl: "https://picsum.photos/400/500?random=103",
    tags: ["音乐", "制作", "主理人"]
  },
  {
    id: "t4",
    name: "剪辑指导",
    role: "灯光师 / 剪辑",
    imageUrl: "https://picsum.photos/400/500?random=104",
    tags: ["剪辑", "灯光"]
  },
  {
    id: "t5",
    name: "特效包装",
    role: "剪辑师 / 特效包装师",
    imageUrl: "https://picsum.photos/400/500?random=105",
    tags: ["特效", "包装"]
  },
  {
    id: "t6",
    name: "物料负责",
    role: "物料负责人",
    imageUrl: "https://picsum.photos/400/500?random=106",
    tags: ["物料", "执行"]
  }
];

// 使用 Unsplash 图片作为占位符。您可以替换为您自己的图片链接。
export const PORTFOLIO_DATA: ServiceCategory[] = [
  {
    id: ServiceType.BRANDING,
    name: "品牌设计",
    icon: "Palette",
    items: [
      {
        id: "b1",
        title: "未来方舟-甜蜜小镇",
        description: "小区对外形象VI设计及施工图展示",
        imageUrl: "https://picsum.photos/800/600?random=1",
        gallery: [
            "https://picsum.photos/800/600?random=20",
            "https://picsum.photos/800/600?random=21",
            "https://picsum.photos/800/600?random=22"
        ],
        tags: ["VI设计", "导视系统"]
      },
      {
        id: "b2",
        title: "贵州省图书馆IP",
        description: "“贵图猫”形象IP设计规划",
        imageUrl: "https://picsum.photos/800/600?random=2",
        tags: ["IP设计", "文创"]
      },
      {
        id: "b3",
        title: "工商银行中西支行",
        description: "专属VI设计及海报物料",
        imageUrl: "https://picsum.photos/800/600?random=3",
        tags: ["银行", "VI"]
      }
    ]
  },
  {
    id: ServiceType.VIDEO,
    name: "影视拍摄",
    icon: "Video",
    items: [
      {
        id: "v1",
        title: "醒狮影视",
        description: "专业级影视达芬奇导师认证，电影级调色。",
        imageUrl: "https://picsum.photos/800/600?random=4",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with real video link
        tags: ["宣传片", "微电影"]
      },
      {
        id: "v2",
        title: "中国南方电网",
        description: "“中国十大国之重器”宣传片拍摄",
        imageUrl: "https://picsum.photos/800/600?random=5",
        tags: ["企业宣传", "航拍"]
      },
      {
        id: "v3",
        title: "贵州机车节",
        description: "激情贵州汽车摩托车系列赛",
        imageUrl: "https://picsum.photos/800/600?random=6",
        tags: ["活动拍摄", "后期制作"]
      }
    ]
  },
  {
    id: ServiceType.MUSIC,
    name: "音乐制作",
    icon: "Music",
    items: [
      {
        id: "m1",
        title: "龙予成林音乐工作室",
        description: "原创独立音乐制作，广告片编曲。",
        imageUrl: "https://picsum.photos/800/600?random=7",
        tags: ["编曲", "录音"]
      },
      {
        id: "m2",
        title: "微视频BGM制作",
        description: "为企业视频定制专属背景音乐。",
        imageUrl: "https://picsum.photos/800/600?random=8",
        tags: ["BGM", "配乐"]
      }
    ]
  },
  {
    id: ServiceType.EVENT,
    name: "活动搭建",
    icon: "Tent",
    items: [
      {
        id: "e1",
        title: "贵州茶叶营销发展论坛",
        description: "大型舞台搭建与灯光音响执行。",
        imageUrl: "https://picsum.photos/800/600?random=9",
        gallery: [
            "https://picsum.photos/800/600?random=30",
            "https://picsum.photos/800/600?random=31"
        ],
        tags: ["舞台搭建", "会议"]
      },
      {
        id: "e2",
        title: "开业典例",
        description: "舞狮点睛，剪彩仪式策划执行。",
        imageUrl: "https://picsum.photos/800/600?random=10",
        tags: ["庆典", "策划"]
      }
    ]
  },
  {
    id: ServiceType.PRINTING,
    name: "物料印刷",
    icon: "Printer",
    items: [
      {
        id: "p1",
        title: "自有印刷厂房",
        description: "UV打印，喷绘，写真，各类广告物料制作。",
        imageUrl: "https://picsum.photos/800/600?random=11",
        gallery: [
            "https://picsum.photos/800/600?random=40",
            "https://picsum.photos/800/600?random=41",
            "https://picsum.photos/800/600?random=42"
        ],
        tags: ["工厂实景", "物料"]
      },
      {
        id: "p2",
        title: "党建文化墙",
        description: "设计制作与安装一站式服务。",
        imageUrl: "https://picsum.photos/800/600?random=12",
        tags: ["文化墙", "安装"]
      }
    ]
  }
];

// Combine all info for the AI context
export const FULL_CONTEXT = `
Company Name: ${COMPANY_INFO.name}
Slogan: ${COMPANY_INFO.slogan}
Phone Numbers: ${COMPANY_INFO.phones.join(', ')}
Description: ${COMPANY_INFO.description}
Team Members: ${TEAM_MEMBERS.map(m => `${m.name} (${m.role})`).join(', ')}
Services:
${PORTFOLIO_DATA.map(cat => `- ${cat.name}: ${cat.items.map(item => item.title).join(', ')}`).join('\n')}
`;