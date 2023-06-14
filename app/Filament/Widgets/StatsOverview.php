<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Card;

class StatsOverview extends BaseWidget
{
    protected function getCards(): array
    {
        return [
            Card::make('Revenue', '$' . number_format(Order::sum('total_amount'), 0, ',', '.'))
                ->description('Total revenue')
                ->descriptionIcon('heroicon-s-currency-dollar')
                ->chart([5, 10, 5, 15, 10, 15, 5])
                ->color('success'),
            Card::make('Orders', fn () => Order::count())
                ->description('Total orders')
                ->descriptionIcon('heroicon-s-trending-up')
                ->chart([7, 2, 10, 3, 15, 4, 17]),
            Card::make('Customers', fn () => Order::distinct('user_id')->count('user_id'))
                ->description('Total customers')
                ->descriptionIcon('heroicon-s-user-group')
                ->chart([5, 10, 5, 15, 10, 15, 5])
                ->color('warning'),
        ];
    }
}
