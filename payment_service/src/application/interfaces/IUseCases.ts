import { IgetPaymentUseCase, IGetSummaryUseCase, ISavePaymentUseCase,IGetInstructorSummaryUseCase } from "../../domain/IUseCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    savePaymentUseCase:(dependencies:IDependencies) => ISavePaymentUseCase;
    getPaymentUseCase:(dependencies:IDependencies)=>IgetPaymentUseCase
    getSummaryUseCase:(dependencies:IDependencies)=>IGetSummaryUseCase
    getInstructorSummaryUseCase:(dependencies:IDependencies)=> IGetInstructorSummaryUseCase



}