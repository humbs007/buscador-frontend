export function detectCpfCnpj(value) {
    const onlyDigits = value.replace(/\D/g, '')
    return onlyDigits.length <= 11 ? 'cpf' : 'cnpj'
  }
  