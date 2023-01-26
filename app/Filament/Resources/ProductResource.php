<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Category;
use App\Models\Product;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Card::make()->columns(1)->schema([
                    Grid::make()->schema([
                        Forms\Components\TextInput::make('name')
                            ->afterStateUpdated(function (Closure $get, Closure $set, ?string $state) {
                                if (! $get('is_slug_changed_manually') && filled($state)) {
                                    $set('slug', Str::slug($state));
                                }
                            })
                            ->reactive()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->afterStateUpdated(function (Closure $set) {
                                $set('is_slug_changed_manually', true);
                            })
                            ->required()
                            ->disabled()
                            ->maxLength(255),
                    ]),
                    Forms\Components\Textarea::make('description')
                        ->required(),
                    Forms\Components\TextInput::make('highlights')
                        ->required(),
                    Forms\Components\TextInput::make('details')
                        ->required()
                        ->maxLength(255),
                ]),
                Card::make()->columns(1)->schema([
                    Grid::make()->schema([
                        Select::make('category_id')
                            ->label('Category')
                            ->options(Category::all()->pluck('name', 'id'))
                            ->relationship('category', 'name'),
                        Select::make('discount_id')
                            ->label('Discount')
                            ->options(Category::all()->pluck('name', 'id'))
                            ->relationship('discount', 'name'),
                    ]),
                    Grid::make()->schema([
                        Forms\Components\TextInput::make('weight')
                            ->numeric()
                            ->type('number')
                            ->required(),
                        Forms\Components\TextInput::make('tax')
                            ->numeric()
                            ->type('number')
                            ->required(),
                    ]),
                    Forms\Components\Toggle::make('featured')
                        ->required(),
                ]),

                Section::make('Prices')->columns(1)->schema([
                    Repeater::make('prices')
                        ->relationship()
                        ->schema([
                            Grid::make(4)->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required(),
                                Forms\Components\TextInput::make('price')
                                    ->numeric()
                                    ->type('number')
                                    ->required(),
                                Forms\Components\TextInput::make('min_order')
                                    ->numeric()
                                    ->type('number')
                                    ->required(),
                                Forms\Components\TextInput::make('max_order')
                                    ->numeric()
                                    ->type('number')
                                    ->required(),
                            ]),
                        ])->createItemButtonLabel('Add New Price'),

                ]),
                Section::make('Variant')->columns(1)->schema([
                    Repeater::make('variants')
                        ->relationship()
                        ->schema([
                            Grid::make(1)->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required(),
                                Repeater::make('options')->schema([
                                    Forms\Components\TextInput::make('value')
                                        ->required(),
                                ])->createItemButtonLabel('Add New Option'),
                            ]),
                        ])->createItemButtonLabel('Add New Variant'),
                ]),

                Card::make()->columns(1)->schema([
                    FileUpload::make('images')
                        ->image()
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->imageResizeTargetWidth('1920')
                        ->imageResizeTargetHeight('1080')
                        ->multiple()
                        ->directory('images/asset/products')
                        ->maxFiles(4)
                        ->required(),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\ImageColumn::make('images.0')
                    ->square()
                    ->label('Image'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\IconColumn::make('discount.active')
                    ->sortable()
                    ->boolean(),
                Tables\Columns\IconColumn::make('featured')
                    ->sortable()
                    ->boolean(),
                Tables\Columns\TextColumn::make('weight')
                    ->icon('heroicon-o-cube')
                    ->iconPosition('after'),
                Tables\Columns\TextColumn::make('tax')
                    ->icon('heroicon-o-receipt-tax')
                    ->iconPosition('after'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            'category' => RelationManagers\CategoryRelationManager::class,
            'discount' => RelationManagers\DiscountRelationManager::class,
            'prices' => RelationManagers\PricesRelationManager::class,
            'variants' => RelationManagers\VariantsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
