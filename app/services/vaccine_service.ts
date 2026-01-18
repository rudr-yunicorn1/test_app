import Vaccine from '#models/vaccine'

export class VaccineServices {
  public async updatebyid(
    id: number,
    data: {
      name: string
      expiry: Date
      doctor_name: string
      does_required: number
      is_active: boolean
    }
  ) {
    const vaccine = await Vaccine.find(id)
    vaccine?.merge(data)
    await vaccine?.save()
    return vaccine
  }
  async createVaccine(data: {
    name: string
    expiry: Date
    doctor_name: string
    does_required: number
    is_active: boolean
  }) {
    const vaccine = await Vaccine.create({
      name: data.name,
      expiry: data.expiry,
      doctor_name: data.doctor_name,
      does_required: data.does_required,
      is_active: data.is_active,
    })
    return vaccine
  }

  async vaccinebyid(id: number) {
    const vaccine = await Vaccine.find(id)
    return vaccine
  }
}
