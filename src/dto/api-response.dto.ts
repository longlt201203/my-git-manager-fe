import PaginationDto from "./pagination.dto";

export default interface ApiResponseDto<T> {
  data: T;
  pagination: PaginationDto;
  message?: string;
}
