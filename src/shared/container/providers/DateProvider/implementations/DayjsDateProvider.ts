import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider{
  
   
   //Verifica o diferença entre as datas e retorna a difereça em horas
    compareInHours(start_date: Date, end_date: Date): number {
      const start_date_utc = this.convertToUTC(start_date);  
      const end_date_utc = this.convertToUTC(end_date);

      return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    //Converte a data para o padrão UTC local
    convertToUTC(date: Date): string {
       return dayjs(date).utc().local().format();
    }

    //Reorna a data atual
    dateNow(): Date {
       return dayjs().toDate();
    }

    //Verifica o diferença entre as datas e retorna a difereça em dias
    compareInDays(start_date: Date, end_date: Date): number {
      
      const start_date_utc = this.convertToUTC(start_date);  
      const end_date_utc = this.convertToUTC(end_date);
     

      return dayjs(end_date_utc).diff(start_date_utc, "days");
   }

   compareInDaysDelay(start_date: Date, end_date: Date): number {
      const start_date_utc = this.convertToUTC(start_date);  
      const end_date_utc = this.convertToUTC(end_date);

      
      return dayjs(start_date_utc).diff(end_date_utc, "days");
   }

   addDays(days: number): Date {
      return dayjs().add(days, "days").toDate();
   }

   addHours(hours: number): Date {
      return dayjs().add(hours, "hours").toDate();
   }

   compareIfBefore(start_date: Date, end_date: Date): boolean {
     return dayjs(start_date).isBefore(end_date);
   }
    
}

export { DayjsDateProvider }