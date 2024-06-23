/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import logger from '../../config/logger';
import { Injectable } from '@nestjs/common';
import { IAxiosOption } from '../../common/interfaces/IAxiosOption.interface';
import { IRequestData } from '../../common/interfaces/IRequestData.interface';

@Injectable()
export class RequestService {
  private headers = {
    'Content-Type': 'application/json',
  };

  public async call(
    url: string,
    method?: 'GET',
    requestBody?: IRequestData,
  ) {
    try {
      logger.debug(`klub-bpmn-svc:klub-common-service:RequestService:call:RequestUrl: ${method}/ ${url}`);
      if (requestBody) {
        if (requestBody.params) {
          url = this.replaceParams(url, requestBody.params);
        }
        if (requestBody.queries) {
          url = this.appendQueryString(url, requestBody.queries);
        }
      }
      logger.debug(`klub-bpmn-svc:klub-common-service:RequestService:call:RequestUrl: ${method}/ ${url}`);
      const options: IAxiosOption = {
        url,
        method,
        headers: {
          ...this.headers,
          ...requestBody?.headers,
        },
        ...(requestBody ? { data: requestBody.body } : {}),
      };

      logger.info(
        `klub-bpmn-svc:klub-common-service:RequestService:call:options: ${JSON.stringify({ options })}`,
      );
      const response = await axios(options);
      logger.info(
        `klub-bpmn-svc:klub-common-service:RequestService:call:Response: ${JSON.stringify(response.data)}`,
      );

      return response.data;
    } catch (error) {
      logger.error(
        `klub-bpmn-svc:klub-common-service:RequestService:call:Error: ${JSON.stringify(error)}`,
      );
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        const message = 'An error occurred while making the request.';
        throw { ...error.request, message };
      }
      throw error;
    }
  }

  private replaceParams(url: string, params: Record<string, any>): string {
    const keys: string[] = Object.keys(params);
    logger.debug(
      `klub-common-service:RequestService:replaceParams: ${JSON.stringify({ keys })}`,
    );
    for (const key of keys) {
      logger.debug(`klub-bpmn-svc::${key} ${params[key]}`);
      url = url.replace(`:${key}`, params[key]);
      logger.debug(
        `klub-common-service:RequestService:replaceParams: ${JSON.stringify({ url })}`,
      );
    }

    return url;
  }

  private appendQueryString(url: string, queries: Record<string, any>): string {
    let queryString: string = '';
    const keys: string[] = Object.keys(queries);
    if (keys.length > 0) {
      while (keys.length > 1) {
        const key: string = keys.pop();
        queryString += `${key}=${queries[key]}&`;
      }
      queryString += `${keys[0]}=${queries[keys[0]]}`;
    }

    return queryString ? url + `?${queryString}` : url;
  }
}