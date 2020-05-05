import moment from 'moment/moment';
import 'moment/locale/pt-br';

export const formatLocalDateTime = (creationDate) =>{
    return moment(creationDate).locale('pt-br').format('LL');
};

