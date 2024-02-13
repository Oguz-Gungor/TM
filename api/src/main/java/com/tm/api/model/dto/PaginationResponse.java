package com.tm.api.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PaginationResponse<T> {
    private int pageCount;
    private int pageNumber;
    private Long totalData;

    private List<T> data;
}
