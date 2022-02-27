import fetch from 'sync-fetch';
import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';


const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  company: faker.phone.phoneNumberFormat(),
  isVerified: sample(["Male", "Female"]),
  status: sample(['absent', 'present']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer'
  ])
}));

console.log("Hello");
// let temp_array =[];



// fetch('http://localhost:80/getTeachersData', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   }
// })
// .then(response => response.json())
// .then(data => {
//   console.log(data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

// console.log(faculties.length);

const metadata = fetch('http://localhost:80/getTeachersData', {
  method: 'POST',
  headers: {
    Accept: 'application/vnd.citationstyles.csl+json'
  }
}).json()
// console.log(metadata);

// console.log(temp_array);

let result = [];

console.log("jhgh");
for(let i = 0 ; i < metadata.faculties.length ; i += 1){

  let obj = {
    id : metadata.faculties[i]._id ,
    avatarUrl: metadata.faculties[i].imageUrl,
    name : metadata.faculties[i].fullName,
    company:metadata.faculties[i].contact,
    isVerified:metadata.faculties[i].gender,
    role:metadata.faculties[i].subject,
    status: sample(['absent', 'present'])


  }
  result.push(obj);
}
result = [...result, ...users];

// export default users;
// export default temp_array;
// export default metadata;
export default result;