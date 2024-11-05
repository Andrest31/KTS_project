import React from 'react';
import styles from './Input.module.scss'; // Обновленное название файла

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { value, onChange, afterSlot, type = 'text', className = '', disabled, placeholder, ...rest },
    ref
  ) => {
    const containerClasses = [
      styles['dynamicWrapper'],
      className,
      disabled ? styles['stateDisabled'] : '',
      value ? styles['filledState'] : styles['emptyState'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        <input
          {...rest}
          ref={ref}
          type={type}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={styles['inputField']}
          disabled={disabled}
        />
        {afterSlot && (
          <div className={styles['slotWrapper']}>
            {afterSlot}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
