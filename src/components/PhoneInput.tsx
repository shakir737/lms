import {
    Control,
    FieldValues,
    Controller,
    FieldErrors,
    UseFormSetValue,
} from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import libphonenumber from 'google-libphonenumber';
import { useState } from 'react';

// Define props for the PhoneInput component
interface PhoneInputProps {
    id: string; // Input identifier for referencing and rendering
    control: Control<FieldValues, any>; // React Hook Form's 'control' prop for form communication
    errors: FieldErrors;  // React Hook Form's 'errors' prop for validation messages
    setValue: UseFormSetValue<FieldValues>;  // React Hook Form's 'setValue' prop for dynamic input value setting
    isSubmitted: boolean; // Flag indicating form submission status
}

const PhoneNumberInput: React.FC<PhoneInputProps> = ({
    control,
    id,
    errors,
    setValue,
    isSubmitted,
}) => {
    const [phoneNumberData, setPhoneNumberData] = useState<CountryData>({
        name: 'INDIA',  
        dialCode: '+91',  
        countryCode: 'in', 
        format: '+.. .....-.....',
     });
     const validatePhoneNumber = (
        value: string, // The phone number input value (includes the country code)
        inputInformation: CountryData // Country information for validation(dialcode and country code)
    ) => {
        let isValid = true; // Assume the number is initially valid
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();  // Get an instance of libphonenumber
        
        // Extract the actual phone number (excluding the country code)
        const phoneNumber = value.substring(inputInformation.dialCode.length);
        
        // Get the length of an example number based on the country code for validation
        const exampleNumberLengthByCountryCode = phoneUtil 
            .getExampleNumber(inputInformation.countryCode) 
            .getNationalNumber()
            ?.toString().length;
    
        // Check if the input length matches the example number length
        if (phoneNumber.length !== exampleNumberLengthByCountryCode){
          return false;
        }
        
        // Return the validation result
        return isValid;
    };
    
    // States and functions
    const handleOnChange = (value: string, inputData: CountryData) => {
        setValue(id, value, { shouldValidate: isSubmitted });
        setPhoneNumberData(prevData=>inputData);
    };
    return (
        // Use Controller component from react-hook-form
        <Controller
            name={id}
            control={control}
            // Define rules for validation
            rules={{   
                required: 'Phone number is required!',
                validate: (fieldValue) => {  
                    const isValid = validatePhoneNumber(
                        fieldValue,
                        phoneNumberData
                    );
                    return isValid || 'Phone Number is not valid!';
                },  
            }}

            render={({ field }) => {
                return (
                    <div className="flex flex-col mb-6">
                        {/* PhoneInput component */}
                        <PhoneInput
                            onChange={(value, inputData) =>
                                handleOnChange(value, inputData as CountryData)
                            }
                            value={field.value}
                            country={'in'}
                            inputStyle={{ width: '100%' }}
                            inputProps={{
                                className: `
                                    form-input
                                    py-3
                                    pr-4
                                    pl-[45px]
                                    border-solid
                                    border
                                    rounded-md
                                    text-gray-900
                                    shadow-sm ring-1
                                    ring-inset
                                    sm:text-[1.4rem]
                                    focus:ring-1
                                    focus:ring-inset
                                    focus:ring-emerald-600
                                    ${errors[id] && 'focus:ring-red-500'}
                                `,
                            }}
                            placeholder="Enter your phone number"
                            enableSearch
                            countryCodeEditable={false}
                            autoFormat
                        />
                        {/* Display error message if any */}
                        {errors[id] && errors[id]?.message && (
                            <span className="text-red-500 text-lg mt-1.5">
                                {errors[id]?.message as React.ReactNode}
                            </span>
                        )}
                    </div>
                );
            }}
        />
    );

}

export default PhoneNumberInput;


