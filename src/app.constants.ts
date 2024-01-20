export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum GesttionaErrors {
  INVALID_CONTRACT = 'Usuario fuera de contrato',
  INVALID_USER = 'Usuario Inválido',
  WORKER_DAY_EXISTENT = 'Usuario ya marcó y su worker day existe',
  INEXISTENT_SHIFT = 'Turno no existe',
  JUSTIFIED_ASSISTANCE = 'Posee ausencia justificada',
}

export enum GesttionaWarnings {
  ERROR_UPLOADING_IMAGE = 'Error al almacenar la imagen',
}
