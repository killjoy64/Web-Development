## Assignment: Project 2
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.10.1.2015.1
## Purpose: To build a program that calculates the cost of a house sign using logic statements

use 5.1.4;
use warnings;

my ($orderNum, $signChars, $totalBill, $counterInt);            #Integer Declarations
my ($customerName, $signWoodType, $signCharColor);              #String Declarations

use constant MAX_RECURSIONS => 3;
use constant DOLLAR_SIGN => '$';

sub main() {
    system("cls");
    
    if (!defined $counterInt) {
        $counterInt = 0;
    }
       
    resetTotalBill();
    setOrderNumber();
    setCustomerName();
    setWoodType();
    setNumOfChars();
    setColorOfChars();
    calculateTotalBill();
    printTotalBillAndResults();
}

main();

sub setOrderNumber() {
    print "What order number is this? ";
    chomp ($orderNum = <STDIN>);
}

sub setCustomerName() {
    print "\nWhat is the customer's name? ";
    chomp ($customerName = <STDIN>);
}

sub setWoodType() {
    print "\nWhat wood type? (0 = whatever I can find laying around, 1 = oak) ";
    chomp ($signWoodType = <STDIN>);
}

sub setNumOfChars() {
    print "\nHow many characters was requested? ";
    chomp ($signChars = <STDIN>);
}

sub setColorOfChars() {
    print "\nWhat character color was requested? (0 = black, 1 = white, 2 = gold-leaf) ";
    chomp ($signCharColor = <STDIN>);
}

sub resetTotalBill() {
    $totalBill = 0;
}

sub calculateTotalBill() {
    if (!defined($totalBill)) {
        $totalBill = 0;
    }
    
    # Min/Max constants
    use constant MINIMUM_PRICE => 30;
    use constant MAXIMUM_SIGN_CHARS => 6;
    
    # Input constants
    use constant EVERYTHING_ELSE => 0;
    use constant OAK => 1;
    use constant BLACK_LETTERING => 0;
    use constant WHITE_LETTERING => 1;
    use constant GOLDLEAF_LETTERING => 2;
    
    # Price constants 
    use constant PRICE_PER_CHAR => 3;
    use constant OAK_WOOD_PRICE => 15;
    use constant GOLD_LEAF_COLORING => 12;
    
    if ($signWoodType == OAK) {
        $totalBill = $totalBill + OAK_WOOD_PRICE;
    } elsif (!$signWoodType == EVERYTHING_ELSE) {
        printError();
    }
    
    if ($signChars > MAXIMUM_SIGN_CHARS) {
        $totalBill = $totalBill + (($signChars - MAXIMUM_SIGN_CHARS) * PRICE_PER_CHAR);
    }
    
    if ($signCharColor == GOLDLEAF_LETTERING) {
        $totalBill = $totalBill + GOLD_LEAF_COLORING;
    } elsif (($signCharColor != BLACK_LETTERING) && ($signCharColor != WHITE_LETTERING)) {
        printError();
    }
    
    if ($totalBill < MINIMUM_PRICE) {
        $totalBill = MINIMUM_PRICE;
    }
}

sub printTotalBillAndResults() {
    sleep 1;
    system("cls");
    print "Order ID: $orderNum\n";
    print "Customer Name: $customerName\n";
    print "Sign Wood Type: $signWoodType\n";
    print "Sign Characters: $signChars\n";
    print "Sign Character Color: $signCharColor\n\n";
    print "Your total bill is " . DOLLAR_SIGN . "$totalBill\n\n";
    determineIfContinuing();
}

sub printError() {
    system("cls");
    print "Hey there hosay! You entered some invalid data!\n\n";
    determineIfContinuing();
}

sub printGoodbye() {
    system("cls");
    print "Goodbye n3rd!\n\n";
    die "";
}

sub determineIfContinuing() {
    if ($counterInt < MAX_RECURSIONS) {
        use constant YES => 1;
        use constant NO => 0;
        
        print "Would you like to return to the program? (0 = no, 1 = yes) ";
    
        my $continueInt;
        chomp ($continueInt = <STDIN>);
        
        if ($continueInt == YES) {
            $counterInt++;
            main();
        } else {
            printGoodbye();
        }
    } else {
        printGoodbye();   
    }   
}