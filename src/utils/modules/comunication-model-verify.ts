export default function communicationModelVerify(value: any): boolean {
    try {
        value = JSON.parse(value);

        const validation =
            Array.isArray(value?.actors) &&
            Array.isArray(value?.communicativeEvents) &&
            Array.isArray(value?.specialisedCommunicativeEvents) &&
            Array.isArray(value?.communicativeInteractions) &&
            Array.isArray(value?.precedenceRelations);

        console.log(
            typeof value.additional_attributes,
            Array.isArray(value.additional_attributes)
        );

        if (validation && typeof value.additional_attributes === 'object') {
            console.log('entra');

            return Array.isArray(value.additional_attributes);
        }

        return !validation;
    } catch (error) {
        return true;
    }
}
