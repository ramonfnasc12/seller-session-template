import { ExternalClient, IOContext, InstanceOptions } from "@vtex/api"

interface Seller {
  id: string;
  name: string;
  logo: string;
}

interface Content {
  id: string;
  sellers: Seller[];
}


export class Region extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true',
        contentType: 'application/json',
        Accept: 'application/json',
      },
    })
  }

  public GetRegion = async (
    postalCode: string,
    country: string
  ): Promise<Content[]> => {
      const response =
        await this.http.get<any>(
          `http://${this.context.account}.vtexcommercestable.com.br/api/checkout/pub/regions?country=${country}&postalCode=${postalCode}&desiredSellerType=All`,
        )
      return response
  }
}