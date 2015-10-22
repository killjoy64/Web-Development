## Assignment: Project 4
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.10.1.2015.1
## Purpose: To build a program that runs the dice game pig

use 5.1.4;
use warnings;

use constant PLAYER => 0;
use constant COMPUTER => 1;
use constant DIE_SIZE => 6;
use constant YES => 1;

my ($continueInt, $continueTurnInt, $diceOne, $diceTwo, $currentTurn);
my @scores;

sub main() {
    displayWelcome();
    setContinueProgramInt();
    setContinueTurnInt();
    resetScore();
    while ($continueInt == YES) {
        setPlayerScore();
        setComputerScore();
    }
}

main();

sub displayWelcome() {
    print "Welcome to the Dice Game Pig!\n";
    sleep 1;
    print "\n0 - Display info on how to play pig";
    print "\n1 - Play a game of pig versus a computer";
    print "\n\nWhat would you like to do? ";
    my $option;
    use constant HELP_ME => 0;
    use constant START_GAME => 1;
    
    chomp ($option = <STDIN>);
    
    if ($option == START_GAME) {
        print "\nLet the game begin!\n";
        sleep 1;
    } elsif ($option == HELP_ME) {
        displayHelp();
    }
    
}

sub displayHelp() {
    print "\n--------------------------------RULES--------------------------------";
    print "\n1. Each player rolls two die, and the sum is added to their total score";
    print "\n2. However, 1 is rolled, the turn score is 0 and must end their turn";
    print "\n3. If two 1s are rolled, then the player's total score is reset to 0";
    print "\n--------------------------------RULES--------------------------------";
    setContinueProgramInt();
}

sub setContinueProgramInt() {
    if (!(defined $continueInt)) {
        $continueInt = YES;
    } else {
        print "\nWould you like to continue? (0=no, 1=yes) ";
        chomp ($continueInt = <STDIN>);
    }
}

sub setContinueTurnInt() {
    if (!(defined $continueTurnInt)) {
        $continueTurnInt = YES;
    } else {
        if ($diceOne != 1 && $diceTwo != 1) {
            $scores[$currentTurn][0] = $scores[$currentTurn][0] + ($diceOne + $diceTwo);
            
            print "\nWould you like to continue your turn? (0=no, 1=yes) ";
            chomp ($continueTurnInt = <STDIN>);
        } else {
            if ($diceOne != 1 || $dieTwo != 1) {
                print "\nA 1 was rolled and your turn must end!\n";
                sleep 2;
                $continueTurnInt = 0;
            }
        }
        
    }
}

sub rollDie() {
    $diceOne = int(rand(DIE_SIZE - 1) + 1);
    $diceTwo = int(rand(DIE_SIZE - 1) + 1);
}

sub clearScreen() {
    system("cls");
}

sub resetScore() {
    @scores = ([0], [0]);
}

sub resetContinueTurnInt() {
    $continueTurnInt = YES;
}

sub setPlayerScore() {
    $currentTurn = PLAYER;
    resetContinueTurnInt();
    while($continueTurnInt == YES) {
        clearScreen();
        rollDie();
        print "\nPlayer ($scores[PLAYER][0]) rolled $diceOne and $diceTwo";
        setContinueTurnInt();
    }
}

sub setComputerScore() {
    $currentTurn = COMPUTER;
    resetContinueTurnInt();
    while($continueTurnInt == YES) {
        clearScreen();
        rollDie();
        print "\nComputer ($scores[COMPUTER][0]) rolled $diceOne and $diceTwo";
        setContinueTurnInt();
    }
}