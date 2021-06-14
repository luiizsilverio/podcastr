import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatDate = (vdata) => {
  let dataFormatada = format(vdata, "EEEEEE, d MMMM", { locale: ptBR })
  return dataFormatada
}  
