import {EnvironmentDefinition} from './types';

const data = window['env' as any] as unknown as EnvironmentDefinition;
if(!data){
  console.error('Cannot recover env variables, check config');
}

/**
 * Importante
 * NO debe quemar variables de entorno en este archivo
 * Recuerde que cada vez que se agregue una variable de entorno se debe agregar en:
 * env_files/dev.env
 * src/assets/env.template.js
 */

export const environment: EnvironmentDefinition = {
  production: data.production,
  api: data.api,
};
if(!environment.api){
  alert("Error desconocido, no se pudo obtener variables de entorno");
}
