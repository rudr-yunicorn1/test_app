import vine from '@vinejs/vine'

export const PatientValidatorUpdate = vine.compile(
  vine.object({
    patient_name: vine.string().minLength(3).optional(),
    father_name: vine.string().minLength(3).optional(),
    age: vine.number().optional(),
    doctor_id: vine.number().optional(),
    vaccine_name: vine.string().optional(),
    phone_number: vine.number().optional(),
  })
)

export const PatientValidatorCreate = vine.compile(
  vine.object({
    patient_name: vine.string().minLength(3),
    father_name: vine.string().minLength(3),
    age: vine.number(),
    doctor_id: vine.number(),
    vaccine_name: vine.string(),
    phone_number: vine.number(),
  })
)
