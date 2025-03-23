import axios from 'axios'
import qs from 'qs';
import { ICheckAvailable, ICheckTripResponse, IGetBogyResponse } from './interface';

export class CheckAvailableService implements ICheckAvailable {
  constructor() { }

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
        'Cookie': 'lang=th; DTicketPublicUserName=DTicketPublicWeb; accessType=4; DTicketPublicSessionId=tMujRJmjLru18ax_CpWkawc6jKIDsV7PXf9WLdUWYH0; JSESSIONID=node01vietmku96npbdj9di9ndzosr3117500.node0; TS0190b5aa=01071ea79eef547a9e8adc2e899766e246cce4d855b373908295662e9cc54300a2b0495c09f571a1299b0394d3a9114c54c83bab0f6502c2364f46e2cdd2858075e6edf8e60b67d7f800cd16e7d81ee0f7fff7cc37eb2792b0899f2b8d479e4d36234bff67338624390588517259db08a18c70c57a859e9aaad14942e7eec2299a9be4e3e54e13e1b50c6bda2d48b7e31b51d4a057a5aad6a6d0c7574a66a40f6e59b077b0; dticket=352456876.37151.0000; ccmp_strictly_setting=false; ccmp_analytics_setting=false; ccmp_functional_setting=false; ccmp_advertising_setting=false; TS014d6755=01071ea79e5df388deb36de16ea147b3854edd9279a956a58702100dd2c72c17456743de1e1e431927e88067684edb52d4c515ac2379c6d3e9d79fce13dc790bf7c5cbc0f7; TS7d2cd1d6027=0883a5da20ab20005cfd1318f68e0b6f13a15b0760c72ffdaf91e2bda772add52a12d7cf92e93e7a0809ac0598113000e577af954eda167cd0aa90242a85fbf80fa2d3adeb1af6644127065efb957deda87b06a9ded7dca3641030f5b60d8873',
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
        'Cookie': 'lang=th; DTicketPublicUserName=DTicketPublicWeb; accessType=4; DTicketPublicSessionId=tMujRJmjLru18ax_CpWkawc6jKIDsV7PXf9WLdUWYH0; JSESSIONID=node01vietmku96npbdj9di9ndzosr3117500.node0; TS0190b5aa=01071ea79eef547a9e8adc2e899766e246cce4d855b373908295662e9cc54300a2b0495c09f571a1299b0394d3a9114c54c83bab0f6502c2364f46e2cdd2858075e6edf8e60b67d7f800cd16e7d81ee0f7fff7cc37eb2792b0899f2b8d479e4d36234bff67338624390588517259db08a18c70c57a859e9aaad14942e7eec2299a9be4e3e54e13e1b50c6bda2d48b7e31b51d4a057a5aad6a6d0c7574a66a40f6e59b077b0; dticket=352456876.37151.0000; ccmp_strictly_setting=false; ccmp_analytics_setting=false; ccmp_functional_setting=false; ccmp_advertising_setting=false; TS014d6755=01071ea79e5df388deb36de16ea147b3854edd9279a956a58702100dd2c72c17456743de1e1e431927e88067684edb52d4c515ac2379c6d3e9d79fce13dc790bf7c5cbc0f7; TS7d2cd1d6027=0883a5da20ab20005cfd1318f68e0b6f13a15b0760c72ffdaf91e2bda772add52a12d7cf92e93e7a0809ac0598113000e577af954eda167cd0aa90242a85fbf80fa2d3adeb1af6644127065efb957deda87b06a9ded7dca3641030f5b60d8873; TS014d6755=01071ea79e5df388deb36de16ea147b3854edd9279a956a58702100dd2c72c17456743de1e1e431927e88067684edb52d4c515ac2379c6d3e9d79fce13dc790bf7c5cbc0f7',
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