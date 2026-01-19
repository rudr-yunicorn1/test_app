import vine from '@vinejs/vine'

export const VaccineValidatorUpdate = vine.compile(
  vine.object({
    name: vine.string().minLength(3).optional(),
    expiry: vine.date().optional(),
    doctor_name: vine.string().optional(),
    does_required: vine.number().optional(),
    is_active: vine.boolean().optional(),
  })
)

export const VaccineValidatorCreate = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    expiry: vine.date(),
    doctor_name: vine.string(),
    does_required: vine.number(),
    is_active: vine.boolean(),
  })
)
