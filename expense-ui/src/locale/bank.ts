export const Bank = {
    appLoading: 'Fetching Bank details !!!',
    emptyCardHeading: 'No Banks details have been added yet.',
    emptyCardInfo: 'To record the expense and apply limit enter the bank details and account tags with bank. Click on add button to add the bank details.',
    addPrimaryCtaText: 'Add Bank Details',
    addSecondaryCtaText: 'Add',
    tableHeading: 'Banks Details',
    tableAmountCountHeading: 'Total Count',
    tooltipAdd:`Add {0} Bank`,
    success: {
        200: '{0} has been {1} successfully',
    },
    error: {
        404: 'Failed to load bank data from server',
        500: 'Error while {0} the {1}',
        delete: 'Failed to delete Bank details.',
        form: {
            name: 'At Least 4 characters required.',
            location: 'Bank Location is required',
            currency: 'Please select any one currency from drop down.',
        }
    },
    modal:{
        addTitle: 'Add Bank',
        editTitle: 'Edit Bank',
        form: {
            label:{
                name: 'Bank Name',
                location: 'Bank Location',
                currency: 'Currency',
                tags: 'Tags'
            },
            primaryEditCTA: 'Edit',
            primarySaveCTA: 'Save',
            secondaryCTA: 'Cancel'
        }
    }
}