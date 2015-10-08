## Assignment: Project 3
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.10.1.2015.1
## Purpose: To build a program that continuously loops itself

use 5.1.4;
use warnings;

my ($zipCode, $customerAge, $itemsOrdered, $continueInt, $isOrderCounted, $ordersFromSameZip, $ordersFromOtherZip, $avgCustomerAge, $ordersOverAge, $ordersUnderAge, $numOfCustomers);

use constant YES => 1;

sub main() {
    setContinueInt();
	resetStats();
    while($continueInt == YES) {
        clearScreen();
        setZipCode();
        setCustomerAge();
        setItemsOrdered();
        printResults();
        setContinueInt();
    }
    printGoodbye();
}

main();

sub clearScreen() {
    system("cls");
}

sub resetStats() {
	$ordersFromOtherZip = 0;
	$ordersFromSameZip = 0;
	$avgCustomerAge = 0;
	$numOfCustomers = 0;
	$ordersOverAge = 0;
	$ordersUnderAge = 0;
}

sub setContinueInt() {
    if(!(defined $continueInt)) {
        $continueInt = YES;
    } else {
        print "\nWould you like to continue? (0=no, 1=yes) ";
        chomp ($continueInt = <STDIN>);
    }
}

sub setZipCode() {
    use constant LOWEST_ZIP => 501;
    use constant HIGHEST_ZIP => 99950;
    use constant COFFEE_ZIP => 54984;
	
    $zipCode = 0;
	
    while($zipCode < LOWEST_ZIP || $zipCode > HIGHEST_ZIP) {
        print "\nWhat's the customer's zip code? ";
        chomp ($zipCode = <STDIN>);
    }
}

sub setCustomerAge() {
    use constant HIGHEST_AGE => 110;
    use constant LOWEST_AGE => 10;
    
    $customerAge = 0;
    
    while($customerAge < LOWEST_AGE || $customerAge > HIGHEST_AGE) {
        print "\nWhat's the customer's age? ";
        chomp ($customerAge = <STDIN>);
    }
}

sub setItemsOrdered() {
    use constant HIGHEST_ORDER => 12;
    use constant LOWEST_ORDER => 1;
    use constant MAX_ALLOWED_TRIES => 3;
    my $timesTried = 0;;
    
    $isOrderCounted = YES;
    $itemsOrdered = 0;
    
    while(($itemsOrdered < LOWEST_ORDER || $itemsOrdered > HIGHEST_ORDER) && $timesTried <= MAX_ALLOWED_TRIES) {
        if($timesTried < MAX_ALLOWED_TRIES) {
            print "\nHow many items did the customer order? ";
            chomp ($itemsOrdered = <STDIN>);
        } else {
            if($itemsOrdered < LOWEST_ORDER) {
                $isOrderCounted = 0;
                print "\nError computing order size! This order will not be counted.\n";
            }
        }
        $timesTried++;
    }
}

sub printResults() {
    clearScreen();
    if ($isOrderCounted == YES) {
		recalculateStatistics();
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
    } else {
        print "That Entire Order Wasn't Counted Because of Your Screw-up.\n";
    }
}

sub recalculateStatistics() {
	use constant AGE_DISCREPENCY => 30;
	
	if ($zipCode != COFFEE_ZIP) {
		$ordersFromOtherZip++;
	} else {
		$ordersFromSameZip++;	
	}
	
	if ($customerAge > AGE_DISCREPENCY) {
		$ordersOverAge++;
	} else {
		$ordersUnderAge++;
	}
	
	$numOfCustomers++;
	
	$avgCustomerAge = ($customerAge + $avgCustomerAge)/ $numOfCustomers;
}

sub printGoodbye() {
    clearScreen();
    print "Goodbye! Thanks for using this worthless program!\n";
}