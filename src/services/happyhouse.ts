import axios from "axios";


export interface HappyHouse {
    PAN_NM: string;            // 공고명
    PAN_NT_ST_DT: string;      // 공고일
    CNP_CD_NM: string;         // 지역
    UPP_AIS_TP_NM: string;     // 공고 유형
    AIS_TP_CD_NM: string;      // 공고 세부 유형
    PAN_SS: string;            // 공고 상태
    DTL_URL: string;           // 상세 url
}

export class HappyHouseService {
    pg_sz: number;
    page: number;

    constructor(
        public api_url: string,
        private api_key: string
    ) {
        this.pg_sz = 100;
        this.page = 1;
    }

    // json 파일에서 필요한부분만 다시 배열화 해준다.
    processHouses(houses: any) {
        const newHouses: HappyHouse[] = [];
        houses.forEach((house: any) => {
            const pro: HappyHouse = {
                PAN_NM: house.PAN_NM,
                PAN_NT_ST_DT: house.PAN_NT_ST_DT,
                CNP_CD_NM: house.CNP_CD_NM,
                UPP_AIS_TP_NM: house.UPP_AIS_TP_NM,
                AIS_TP_CD_NM: house.AIS_TP_CD_NM,
                PAN_SS: house.PAN_SS,
                DTL_URL: house.DTL_URL
            }

            newHouses.push(pro);
        });

        return newHouses;
    }

    async getHappyHouse(cnp_cd: number, pan_ss: string) {
        const houses: any = [];
        let index = 0;
        let pro_houses: HappyHouse[] = [];
        while (true) {
            const query = `?serviceKey=${this.api_key}&PG_SZ=${this.pg_sz}&PAGE=${this.page + index}&CNP_CD=${cnp_cd}&PAN_SS=${encodeURI(pan_ss)}`
            const url = this.api_url + query;
            const { data } = await axios.get(url);
            const houseList = data[1].dsList;

            // 데이터가 마지막이라면 종료한다.
            if (houseList.length === 0) break;
            if (houseList) {
                const newHouses: any = houseList.filter((house: any) => house.AIS_TP_CD_NM === "행복주택");
                Array.prototype.push.apply(houses, newHouses);
            }

            pro_houses = await this.processHouses(houses);
            index++;
        }
        return pro_houses;
    }

}


