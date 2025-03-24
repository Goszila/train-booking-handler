import axios from 'axios'
import qs from 'qs';
import { ICheckAvailable, ICheckTripResponse, IGetBogyResponse } from './interface';

export class CheckAvailableService implements ICheckAvailable {
  cookie = '';
  constructor() {
    // this.cookie = 'lang=th; DTicketPublicUserName=DTicketPublicWeb; accessType=4; DTicketPublicSessionId=MVbQG59BMnvagJAFPy9KcFvIeU0WQiMlSDvZMKRWuNI; JSESSIONID=node01p5u4e7y2sxee1au85iulis8793137361.node0; TS0190b5aa=01071ea79e832f8a4b034114ebcbd8d1d777febf84b373908295662e9cc54300a2b0495c09f571a1299b0394d3a9114c54c83bab0f6502c2364f46e2cdd2858075e6edf8e6b3769f7d22e301a630387cb175ffac6ebdc83d176c3ccbd62977a6cd8548ab24f42be97d5574d2bffa2cf52314e7b06fab9c8208ba039c1bda0e7615d9e712a1143166638fdb4955d5f86e21f01301bb4b2b15973f78c21aacb48538710857b5; dticket=352456876.37151.0000; ccmp_strictly_setting=false; ccmp_analytics_setting=false; ccmp_functional_setting=false; ccmp_advertising_setting=false; TS014d6755=01071ea79e41034f51b45874581236172a76d6df21ab5290bc69fd82bb4eedf4b8ffdee3f8326816fa54183a93117f8003bfab0ff1bc42678fb81fbe920110d4709116640c; TS7d2cd1d6027=0883a5da20ab2000da5b2b390e14fd54f3fb8286021fa975049321f39e2238bedb7938b4600ac6d00818c7d0a7113000eba7e1ada111ba80ec60543cca5264f937b3cd539918005a30fd580378c5e441406590b5b2d102c2241eebaa888ea1b3'
  }

  private generateJSessionID() {
    const nodePart = 'node0';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomPart = '';

    for (let i = 0; i < 32; i++) {
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const jsessionid = `JSESSIONID=${nodePart}${randomPart}.${nodePart}`;
    return jsessionid;
  }

  private async getPublicWebHeader() {
    const getData = await axios.get('https://www.dticket.railway.co.th/DTicketPublicWeb/home/Home')
    return getData.headers['set-cookie']
  }

  private async generateCookie(): Promise<string> {
    const jSessionId = this.generateJSessionID();
    const publicWebHeader: string[] | undefined = await this.getPublicWebHeader()
    return [...publicWebHeader || [], ...jSessionId].join('; ');
  }

  async setCookie() {
    this.cookie = await this.generateCookie()
  }

  async getTrip(dateStart: string): Promise<ICheckTripResponse> {
    let data = qs.stringify({
      'tripType': '1',
      'provinceStartId': '1679',
      'provinceEndId': '313',
      'dateStart': dateStart,
      'dateEnd': '',
      'viewStateHolder': ''
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www.dticket.railway.co.th/DTicketPublicWeb/booking/booking/getTrip',
      headers: {
        'Cookie': this.cookie,
        'host': 'www.dticket.railway.co.th',
        'origin': 'https://www.dticket.railway.co.th',
        'referer': 'https://www.dticket.railway.co.th/DTicketPublicWeb/booking/booking',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: data
    };

    return await axios.request(config)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getCoaches(tripId: string): Promise<IGetBogyResponse> {
    let data = qs.stringify({
      'tripId': tripId,
      'provinceStartId': '1679',
      'provinceEndId': '313',
      'viewStateHolder': 'zc2b59bRlZEF4bKU14IghRDjM1u2h7f8gGsc4nsZk4KXvDX8NhZlIy2Ek3j8WRT2dKKLRs0LqeiZlRK_upOuYCt2TjfpaSYyj8-cc2O-2Aj8M-GKlCxepmXoww-jNRiVurh70Ik7poh3wqISPv31nbPN23pH8xYdqKdd9yM9wX6txG84NRZPgJd5lJ7t5jOvX1swnJ2gRpdL016PH0fhxCEuHYHrbwWgOXfyIvjBg6lQ2_wmIDXNZD5Y3QZQm5erjzAr2b69D41e4P_nMxh96NLl4KZvLm_92qHawqrOS3i4TMC2WNNRBPBmpmSh0xEiBXHHtJjY0oq0ioVCpww4vHU0EKHT64EfjZqs'
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www.dticket.railway.co.th/DTicketPublicWeb/booking/booking/getTrainCoach',
      headers: {
        'Cookie': this.cookie,
        'host': 'www.dticket.railway.co.th',
        'origin': 'https://www.dticket.railway.co.th',
        'referer': 'https://www.dticket.railway.co.th/DTicketPublicWeb/booking/booking',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: data
    };

    return (await axios.request(config)).data
  }
}