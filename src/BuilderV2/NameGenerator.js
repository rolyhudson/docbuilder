import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

export function randomName(prefix){
    return prefix+'_'+uniqueNamesGenerator({
        dictionaries: [ colors, animals]
      });
}