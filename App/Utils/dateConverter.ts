export function DateConverter(date: string): string {
  let year = date.substring(0, 4);
  let month = date.substring(5, 7);
  let day = date.substring(8, 10);

  // switch (month) {
  //   case '01':
  //     month = 'Jan';
  //     break;
  //   case '02':
  //     month = 'Feb';
  //     break;
  //   case '03':
  //     month = 'Mar';
  //     break;
  //   case '04':
  //     month = 'Apr';
  //     break;
  //   case '05':
  //     month = 'May';
  //     break;
  //   case '06':
  //     month = 'Jun';
  //     break;
  //   case '07':
  //     month = 'Jul';
  //     break;
  //   case '08':
  //     month = 'Aug';
  //     break;
  //   case '09':
  //     month = 'Sep';
  //     break;
  //   case '10':
  //     month = 'Oct';
  //     break;
  //   case '11':
  //     month = 'Nov';
  //     break;
  //   default:
  //     month = 'Dec';
  //     break;
  // }

  let convertedDate = `${day}.${month}.${year}`;
  // let convertedDate = `${month} ${day}, ${year}`;
  return convertedDate;
}
