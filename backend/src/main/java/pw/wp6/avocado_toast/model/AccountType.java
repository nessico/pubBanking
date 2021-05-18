package pw.wp6.avocado_toast.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Gets or Sets AccountType
 */
public enum AccountType implements Converter<String, AccountType> {
    BANKER("banker"),
    CUSTOMER("customer"),
    ANALYST("analyst");

    private String value;

    AccountType(String value) {
        this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
        return String.valueOf(value);
    }

    @JsonCreator
    public static AccountType fromValue(String text) {
        for (AccountType b : AccountType.values()) {
            if (b.value.toLowerCase().equals(text.toLowerCase())) {
                return b;
            }
        }
        throw new IllegalArgumentException("Invalid account type " + text);
    }

    @Autowired
    @Override
    public AccountType convert(String source) {
        return AccountType.fromValue(source);
    }

    public String toTableName() {
        return value;
    }
}
