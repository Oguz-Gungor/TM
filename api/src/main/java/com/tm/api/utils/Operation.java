package com.tm.api.utils;

import java.util.Objects;
import java.util.function.Consumer;

public class Operation {

    private Operation() {

    }

    /**
     * Commit set Operation if value is not null
     *
     * @param value  new value
     * @param setter setter function
     * @param <T>    type of value
     */
    public static <T> void setIfNotNull(T value, Consumer<T> setter) {
        if (Objects.nonNull(value)) {
            setter.accept(value);
        }
    }
}
