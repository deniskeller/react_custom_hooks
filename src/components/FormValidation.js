import React, { useEffect, useState } from "react";

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    onBlur,
    onChange,
    isDirty,
    ...valid,
  };
};

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [isEmail, setIsEmail] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLength(true)
            : setMinLength(false);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLength(true)
            : setMaxLength(false);
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "isEmail":
          const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase())
            ? setIsEmail(false)
            : setIsEmail(true);
          break;
      }
    }
  }, [value]);

  return { isEmpty, minLength, maxLength, isEmail };
};

export default function FormValidation() {
  const email = useInput("", {
    isEmpty: true,
    isEmail: true,
  });
  console.log("email: ", email.isEmail);
  const password = useInput("", {
    isEmpty: true,
    minLength: 5,
    maxLength: 10,
  });
  console.log("password: ", password.minLength, password.maxLength);

  return (
    <div>
      <form action="">
        <h1>Registration</h1>

        <div className="">
          {email.isDirty && email.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {email.isDirty && email.isEmail && !email.isEmpty && (
            <div style={{ color: "red" }}>Введены email некорректен</div>
          )}
          <input
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            value={email.value}
            type="text"
            name="email"
            placeholder="email"
          />
        </div>
        <div className="">
          {password.isDirty && password.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {password.isDirty && !password.isEmpty && password.minLength && (
            <div style={{ color: "red" }}>Пароль слишком короткий</div>
          )}
          {password.isDirty && !password.isEmpty && password.maxLength && (
            <div style={{ color: "red" }}>Пароль слишком длинный</div>
          )}
          <input
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
            type="text"
            name="password"
            placeholder="password"
          />
        </div>
        <button
          disabled={email.isEmail || password.minLength || password.maxLength}
          onClick={(e) => {
            e.preventDefault();
            console.log(email.value, password.value);
          }}
        >
          click
        </button>
      </form>
    </div>
  );
}
