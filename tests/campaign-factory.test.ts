import { describe, it, expect, beforeEach } from "vitest"

const mockContract = {
  admin: "STADMIN00000000000000000000000000000000000",
  campaigns: new Map<number, any>(),
  counter: 0,

  isAdmin(caller: string) {
    return caller === this.admin
  },

  createCampaign(caller: string, budget: number, targetingHash: string) {
    this.counter += 1
    this.campaigns.set(this.counter, {
      creator: caller,
      budget,
      targetingHash,
      isActive: true,
    })
    return { value: this.counter }
  },

  deactivateCampaign(caller: string, id: number) {
    const campaign = this.campaigns.get(id)
    if (!campaign) return { error: 101 } // ERR-CAMPAIGN-NOT-FOUND
    if (campaign.creator !== caller) return { error: 100 } // ERR-NOT-AUTHORIZED

    campaign.isActive = false
    this.campaigns.set(id, campaign)
    return { value: true }
  },

  isCampaignActive(id: number) {
    const campaign = this.campaigns.get(id)
    if (!campaign) return { error: 101 }
    return { value: campaign.isActive }
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    this.admin = newAdmin
    return { value: true }
  },
}

describe("CampaignFactory Contract", () => {
  beforeEach(() => {
    mockContract.admin = "STADMIN00000000000000000000000000000000000"
    mockContract.campaigns = new Map()
    mockContract.counter = 0
  })

  it("should create a campaign", () => {
    const result = mockContract.createCampaign(
      "STUSER00000000000000000000000000000000000",
      1000,
      "0xabc123"
    )

    expect(result).toEqual({ value: 1 })
    const campaign = mockContract.campaigns.get(1)
    expect(campaign.creator).toBe("STUSER00000000000000000000000000000000000")
    expect(campaign.budget).toBe(1000)
    expect(campaign.isActive).toBe(true)
  })

  it("should deactivate a campaign by creator", () => {
    const user = "STUSER00000000000000000000000000000000000"
    mockContract.createCampaign(user, 500, "0xdef456")
    const result = mockContract.deactivateCampaign(user, 1)

    expect(result).toEqual({ value: true })
    const status = mockContract.isCampaignActive(1)
    expect(status).toEqual({ value: false })
  })

  it("should not deactivate campaign if not creator", () => {
    const creator = "STUSER00000000000000000000000000000000000"
    const other = "STOTHER00000000000000000000000000000000000"
    mockContract.createCampaign(creator, 300, "0xxyz789")

    const result = mockContract.deactivateCampaign(other, 1)
    expect(result).toEqual({ error: 100 })
  })

  it("should fail to deactivate nonexistent campaign", () => {
    const result = mockContract.deactivateCampaign(
      "STADMIN00000000000000000000000000000000000",
      999
    )
    expect(result).toEqual({ error: 101 })
  })

  it("should check campaign status", () => {
    mockContract.createCampaign("STUSER", 123, "0xaaa")
    const result = mockContract.isCampaignActive(1)
    expect(result).toEqual({ value: true })
  })

  it("should transfer admin rights", () => {
    const result = mockContract.transferAdmin(
      "STADMIN00000000000000000000000000000000000",
      "STNEWADMIN0000000000000000000000000000000"
    )

    expect(result).toEqual({ value: true })
    expect(mockContract.admin).toBe("STNEWADMIN0000000000000000000000000000000")
  })

  it("should fail admin transfer by non-admin", () => {
    const result = mockContract.transferAdmin(
      "STNOTADMIN",
      "STNEWADMIN0000000000000000000000000000000"
    )

    expect(result).toEqual({ error: 100 })
  })
})
