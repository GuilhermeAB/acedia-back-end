import PersonGender from 'src/models/PersonGender';
import makePersonGender, {PERSON_GENDER} from 'src/models/PersonGender/model';

async function add (code: string): Promise<any> {
  const personGender = makePersonGender({code: code});

  await PersonGender.add(personGender);
}

async function init (): Promise<any> {
  await add(PERSON_GENDER.MALE);
  await add(PERSON_GENDER.FEMALE);
  await add(PERSON_GENDER.OTHER);
}

export default {
  init: init
};
