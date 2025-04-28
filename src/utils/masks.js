export const formatCpfCnpj = (value) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 11) {
      // CPF
      return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      // CNPJ
      return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  };
  