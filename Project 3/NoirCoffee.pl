## Assignment: Project 3
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.10.28.2015.2
## Purpose: To build a program that continuously loops itself

use 5.1.4;
use warnings;

my ($zipCode, $customerAge, $itemsOrdered, $continueInt, $isOrderCounted, $ordersFromSameZip, $ordersFromOtherZip, $avgCustomerAge, $ordersOverAge, $ordersUnderAge, $numOfCustomers);

use constant YES => 1;
use constant COFFEE_ZIP => 54984;
use constant AGE_DISCREPENCY => 30;

sub main() {
    setContinueInt();
    while ($continueInt == YES) {
        system("cls");
        setZipCode();
        setCustomerAge();
        setItemsOrdered();
        if ($isOrderCounted == YES) {
            setOrdersOverAge();
            setOrdersUnderAge();
            setOrdersFromOtherZip();
            setOrdersFromSameZip();
            setAverageCustomerAge();
            
            printResults();
        } else {
            printInvalidOrder();
        }
        setContinueInt();
    }
    printGoodbye();
}

main();

sub setContinueInt() {
    if (!(defined $continueInt)) {
        $continueInt = YES;
    } else {
        print "\nWould you like to continue? (0=no, 1=yes) ";
        chomp ($continueInt = <STDIN>);
    }
}

sub setZipCode() {
    use constant LOWEST_ZIP => 501;
    use constant HIGHEST_ZIP => 99950;
	
    $zipCode = 0;
    
    while ($zipCode < LOWEST_ZIP || $zipCode > HIGHEST_ZIP) {
        print "\nWhat's the customer's zip code? ";
        chomp ($zipCode = <STDIN>);
    }
}

sub setCustomerAge() {
    use constant HIGHEST_AGE => 110;
    use constant LOWEST_AGE => 10;
    
    $customerAge = 0;
    
    while ($customerAge < LOWEST_AGE || $customerAge > HIGHEST_AGE) {
        print "\nWhat's the customer's age? ";
        chomp ($customerAge = <STDIN>);
    }
}

sub setItemsOrdered() {
    use constant HIGHEST_ORDER => 12;
    use constant LOWEST_ORDER => 1;
    use constant MAX_ALLOWED_TRIES => 3;
    my $timesTried = 0;
    
    $isOrderCounted = YES;
    $itemsOrdered = 0;
    
    while (($itemsOrdered < LOWEST_ORDER || $itemsOrdered > HIGHEST_ORDER) && $timesTried <= MAX_ALLOWED_TRIES) {
        if ($timesTried < MAX_ALLOWED_TRIES) {
            print "\nHow many items did the customer order? ";
            chomp ($itemsOrdered = <STDIN>);
        } else {
            if ($itemsOrdered < LOWEST_ORDER) {
                $isOrderCounted = 0;
                print "\nError computing order size! This order will not be counted.\n";
            }
        }
        $timesTried++;
    }
}

sub setOrdersFromSameZip() {
    if (!defined $ordersFromSameZip) {
        $ordersFromSameZip = 0;
    }
    
    if($zipCode == COFFEE_ZIP) {
        $ordersFromSameZip++; 
    }  
}

sub setOrdersFromOtherZip() {
    if (!defined $ordersFromOtherZip) {
        $ordersFromOtherZip = 0;
    }
    
    if($zipCode != COFFEE_ZIP) {
        $ordersFromOtherZip++;
    }
}

sub setAverageCustomerAge() {
    if (!defined $avgCustomerAge) {
        $avgCustomerAge = 0;        
    }
    
    if (!defined $numOfCustomers) {
        $numOfCustomers = 0;    
    }
    
    if (!defined $ordersOverAge) {
        $ordersOverAge = 0;    
    }
    
    if (!defined $ordersUnderAge) {
        $ordersUnderAge = 0;   
    }
    
    $numOfCustomers++;
    
    $avgCustomerAge = ($customerAge + $avgCustomerAge) / $numOfCustomers;
}

sub setOrdersOverAge() {
    if (!defined $ordersOverAge) {
        $ordersOverAge = 0;
    }
    
    if($customerAge > AGE_DISCREPENCY) {
        $ordersOverAge++;     
    }
}

sub setOrdersUnderAge() {
    if (!defined $ordersUnderAge) {
        $ordersUnderAge = 0;
    }
    if($customerAge < AGE_DISCREPENCY) {
        $ordersUnderAge++;   
    }
}

sub printResults() {
    system("cls");
    print "================================ORDER INFORMATION===============================\n";
    print "Customer Age: $customerAge\n";
    print "Customer Zip Code: $zipCode\n";
    print "Customer Number of Ordered Items: $itemsOrdered\n";
    print "\n===================================ORDER STATS==================================\n";
    print "Orders From Local Customers: $ordersFromSameZip\n";
    print "Orders From Outside Customers: $ordersFromOtherZip\n";
    print "Average Customer Age: $avgCustomerAge\n";
    print "Orders From Customers Over Age 30: $ordersOverAge\n";
    print "Orders From Customers Under Age 30: $ordersUnderAge\n";
}

sub printInvalidOrder() {
    system("cls");
    print "Sorry! Your order values were not input correctly. The order will not be counted.";
}

sub printGoodbye() {
    system("cls");
    print "Goodbye! Thanks for using this worthless program!\n";
}