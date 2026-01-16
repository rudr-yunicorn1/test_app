import vine from '@vinejs/vine'

export const ValidatorUpdate = vine.compile(
  vine.object({
    doctor_id: vine.number().optional(),
    patient_id: vine.number().optional(),
    hospital_id: vine.number().optional(),
    status_id: vine.boolean().optional(),
  })
)

export const ValidatorCreate = vine.compile(
  vine.object({
    doctor_id: vine.number(),
    patient_id: vine.number(),
    hospital_id: vine.number(),
    status_id: vine.boolean(),
  })
)
