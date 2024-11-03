import ContentWrapper from './ContentWrapper';
import OuterWrapper from './OuterWrapper';

/***
 * Header that contains static "PINUS Expense Tracker" and "Made for pinustech"
 */
const PinusHeader = () => {
    return (
        <>
            {' '}
            <OuterWrapper>
                <ContentWrapper>
                    <p className="font-bold text-4xl">PINUS Expense Tracker</p>
                </ContentWrapper>
            </OuterWrapper>
            <OuterWrapper color="text-white text-lg font-content bg-red-500">
                <ContentWrapper>
                    <p>Made for pinustech</p>
                </ContentWrapper>
            </OuterWrapper>
        </>
    );
};
export default PinusHeader;
