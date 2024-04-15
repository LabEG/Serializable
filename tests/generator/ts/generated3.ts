
import 'reflect-metadata'
import {
    jsonObject,
    jsonProperty,
    jsonName,
    Serializable,
    SnakeCaseNamingStrategy,
    KebabCaseNamingStrategy,
    PascalCaseNamingStrategy
} from "../../../src/index.ts";
import { writeFileSync } from 'fs';
import { join } from 'path';


@jsonObject({ namingStrategy: new KebabCaseNamingStrategy() })
export class Iq4r extends Serializable {
  @jsonName("gKvAD7vxNt")
  @jsonProperty(String)
  private lqPUSzLo: string = "HRS30ORuiP";

  @jsonName("cNf81oexcV")
  @jsonProperty(void -31, [String], void 34)
  private sCbY?: [string] = void 34;

  @jsonName("kDoG0ZP7")
  @jsonProperty(void -18, [String], Number)
  public y24KRH?: [string] | number = void -18;

  
  @jsonProperty(void 39, [Number])
  public q6bVgND59: [number] = [73];

  private k3Z6Qp(): number { return 0; };

  public i5xUZOp(): string { return ""; };

  public eoGBt(): number { return 0; };

  public a0GnI4FA(): string { return ""; };

  private kG5stThS(): string { return ""; };

}

@jsonObject({ namingStrategy: new PascalCaseNamingStrategy() })
export class MN4 extends Serializable {
  @jsonName("ymb")
  @jsonProperty(void 2, Number)
  public hbOSex1O?: number = void 2;

  @jsonName("jq8ofSHmQ")
  @jsonProperty(Date)
  public tIV3Kw1P: Date = new Date("1986-01-26 13:03:19 UTC");

  private sAxq49b(): number { return 0; };

  private lH5(): number { return 0; };

  private mvwLJ(): string { return ""; };

  private p3BdlMsUCc7(): string { return ""; };

  public oso2htp5g5(): string { return ""; };

}

@jsonObject({ namingStrategy: new SnakeCaseNamingStrategy() })
export class LBiCJ extends Serializable {
  @jsonName("or3nWL")
  @jsonProperty(Iq4r, [MN4], [Iq4r])
  public qiK: Iq4r | [MN4] | [Iq4r] = new Iq4r();

  @jsonName("k1XDB7DrcdM")
  @jsonProperty(Iq4r)
  private tuSAzol3tV: Iq4r = new Iq4r();

  @jsonName("wvROCzyJdc")
  @jsonProperty(String, [MN4], [Iq4r])
  private sWuGDnktP: string | [MN4] | [Iq4r] = [new MN4()];

  @jsonName("jpg")
  @jsonProperty(MN4, [MN4], [Iq4r])
  public xn3MKDEPJQb: MN4 | [MN4] | [Iq4r] = [new MN4()];

  @jsonName("e3d7tZtqGcQ")
  @jsonProperty(MN4, Iq4r, [MN4])
  private pUQ: MN4 | Iq4r | [MN4] = new MN4();

  private uAJxyDsedn(): number { return 0; };

  private xPTp2f(): number { return 0; };

  private pue9Xx(): string { return ""; };

}

@jsonObject({ namingStrategy: new KebabCaseNamingStrategy() })
export class BX1 extends Serializable {
  
  @jsonProperty(String, Iq4r)
  private mPeMnhP: string | Iq4r = "";

  @jsonName("rWc")
  @jsonProperty(Iq4r, String)
  private w6VmLm8l: Iq4r | string = "kRidh8m1";

  @jsonName("uZ65ZVRG7")
  @jsonProperty(Number, void -60, [Iq4r])
  public mQoxd?: number | [Iq4r] = void -60;

  @jsonName("pX4qXmO6ly")
  @jsonProperty(void -76, [Iq4r])
  public mx5OK?: [Iq4r] = void -76;

  public ewHHWE5(): string { return ""; };

  private kI8VcsP(): string { return ""; };

  public cfztHEL4z(): number { return 0; };

}

@jsonObject({ namingStrategy: new SnakeCaseNamingStrategy() })
export class Mpq3M0BpBEg extends Serializable {
  @jsonName("jVst")
  @jsonProperty([MN4], void 72, [LBiCJ])
  private q2QvdXEQk: [MN4] | [LBiCJ] = [new MN4()];

  @jsonName("fyhMG9d")
  @jsonProperty(void 31, [LBiCJ])
  public ua1CCVUwao7: [LBiCJ] = [new LBiCJ()];

  @jsonName("b27A5w208b")
  @jsonProperty([BX1], [MN4])
  private rPyzb1DJd: [BX1] | [MN4] = [new BX1()];

  @jsonName("nxmSFQEyz1J")
  @jsonProperty([Date])
  public lkAW1: [Date] = [new Date("1986-04-29 22:35:56 UTC")];

  @jsonName("jT8Q")
  @jsonProperty([LBiCJ])
  public mMeu5qs6: [LBiCJ] = [new LBiCJ()];

  public na7(): number { return 0; };

  public m2w4J(): string { return ""; };

  public lAE(): string { return ""; };

}

@jsonObject({ namingStrategy: new PascalCaseNamingStrategy() })
export class KWGV extends Serializable {
  @jsonName("eLSzfAU")
  @jsonProperty(LBiCJ, [Mpq3M0BpBEg])
  private g6Iwi: LBiCJ | [Mpq3M0BpBEg] = [new Mpq3M0BpBEg()];

  @jsonName("jd0pC5l6xgM")
  @jsonProperty(Iq4r)
  private t2hsHBXDy: Iq4r = new Iq4r();

  @jsonName("uaGq")
  @jsonProperty([LBiCJ], Iq4r, void -42)
  public kIsk: [LBiCJ] | Iq4r = new Iq4r();

  @jsonName("iGdR")
  @jsonProperty(LBiCJ, [Number])
  public gi8Ikw: LBiCJ | [number] = new LBiCJ();

  public lUqVK(): string { return ""; };

  private pW42IVp65KP(): string { return ""; };

  private jPp3(): number { return 0; };

  private lx9lr1GXp(): string { return ""; };

}

@jsonObject({ namingStrategy: new PascalCaseNamingStrategy() })
export class PhJVk extends Serializable {
  @jsonName("dCQ0CvoGg")
  @jsonProperty([Mpq3M0BpBEg])
  public qfS: [Mpq3M0BpBEg] = [new Mpq3M0BpBEg()];

  @jsonName("aqLl6Ysp")
  @jsonProperty(Mpq3M0BpBEg)
  public dyY: Mpq3M0BpBEg = new Mpq3M0BpBEg();

  @jsonName("zkd93Au8Pu")
  @jsonProperty([MN4], void 47)
  private oSrMO2: [MN4] = [new MN4()];

  public gI9xKQCXXo(): string { return ""; };

  public nFsI1HX(): string { return ""; };

  private wdmC(): string { return ""; };

  private mMq0GnS(): number { return 0; };

  private x8SFeTfiL(): string { return ""; };

}

@jsonObject({ namingStrategy: new PascalCaseNamingStrategy() })
export class Xt4r7LK3 extends Serializable {
  @jsonName("oHlgFlL5cd")
  @jsonProperty(void -78, Mpq3M0BpBEg, KWGV)
  public fMFW16?: Mpq3M0BpBEg | KWGV = void -78;

  @jsonName("t07lTuqhQ")
  @jsonProperty([KWGV], [Mpq3M0BpBEg])
  public mhC: [KWGV] | [Mpq3M0BpBEg] = [new Mpq3M0BpBEg()];

  @jsonName("wtlg")
  @jsonProperty(Number)
  private dgubUU0hmN: number = -40;

  @jsonName("jOMz3FS")
  @jsonProperty([Date], [KWGV])
  private prPGQXeoIg: [Date] | [KWGV] = [new KWGV()];

  public lUEtRl7TQW(): number { return 0; };

  public renU(): number { return 0; };

  public cf9AF(): string { return ""; };

}

@jsonObject({ namingStrategy: new PascalCaseNamingStrategy() })
export class JaGKd5NFkvJ extends Serializable {
  @jsonName("wEMCaNX")
  @jsonProperty([String])
  public kwmRaLQ: [string] = ["2cXmkJc"];

  @jsonName("h93I472R")
  @jsonProperty(String)
  private fKEi1Pptkk: string = "zInNmTJ";

  @jsonName("weF9tP")
  @jsonProperty(void 14)
  private g6AaK2S?  = void 14;

  
  @jsonProperty([BX1])
  private mC0YZ0BQ: [BX1] = [new BX1()];

  @jsonName("iQFzsLV")
  @jsonProperty(BX1, void -81)
  private aZJDR: BX1 = new BX1();

  public ufsQoR(): number { return 0; };

  private r4L2BCmUM(): number { return 0; };

}

@jsonObject({ namingStrategy: new KebabCaseNamingStrategy() })
export class So1letl extends Serializable {
  @jsonName("ld4")
  @jsonProperty(PhJVk, [MN4])
  public knPdX4M: PhJVk | [MN4] = new PhJVk();

  @jsonName("szoe")
  @jsonProperty(MN4, [LBiCJ], [MN4])
  public gOuHWQGh5: MN4 | [LBiCJ] | [MN4] = [new LBiCJ()];

  @jsonName("vEPNn4B")
  @jsonProperty(Iq4r, [MN4], KWGV)
  private tNpwhn: Iq4r | [MN4] | KWGV = [new MN4()];

  @jsonName("iZFk3EI")
  @jsonProperty(KWGV)
  public pY5Hh9EbB: KWGV = new KWGV();

  @jsonName("thoZ4knN4")
  @jsonProperty([LBiCJ], Date)
  private xxiV: [LBiCJ] | Date = new Date("1995-10-20 16:38:59 UTC");

  private qSoENGYT1Oo(): string { return ""; };

  public tcXb2DPeSk(): number { return 0; };

  public rl0nWe(): string { return ""; };

  private wpmis(): number { return 0; };

}

@jsonObject({ namingStrategy: new SnakeCaseNamingStrategy() })
export class EpDCe7C extends Serializable {
  @jsonName("ws8b")
  @jsonProperty(Iq4r)
  private ef02WBDHEz: Iq4r = new Iq4r();

  @jsonName("rAqf1OK")
  @jsonProperty(MN4)
  public az2c1lrXao: MN4 = new MN4();

  @jsonName("xktPfL")
  @jsonProperty(LBiCJ)
  public gufECW: LBiCJ = new LBiCJ();

  @jsonName("tqg")
  @jsonProperty(BX1)
  private ftB2r: BX1 = new BX1();

  @jsonName("fOoGuQp")
  @jsonProperty(Mpq3M0BpBEg)
  public oDYGrt2Iz: Mpq3M0BpBEg = new Mpq3M0BpBEg();

  @jsonName("fS0v")
  @jsonProperty(KWGV)
  private sxEUznJz7bR: KWGV = new KWGV();

  @jsonName("n2QipxY9Nmq")
  @jsonProperty(PhJVk)
  public iAfX3: PhJVk = new PhJVk();

  @jsonName("kvicFB")
  @jsonProperty(Xt4r7LK3)
  private eVCdTQzkEgk: Xt4r7LK3 = new Xt4r7LK3();

  @jsonName("f4o6YIbE4C")
  @jsonProperty(JaGKd5NFkvJ)
  private lHu9: JaGKd5NFkvJ = new JaGKd5NFkvJ();

  @jsonName("gbDERM")
  @jsonProperty(So1letl)
  public sEX3Xb5qf: So1letl = new So1letl();

  public tugEyRc(): number { return 0; };

  public nHg1Bs(): number { return 0; };

  public q793a9QvAVU(): string { return ""; };

}

export const TestClass = EpDCe7C
  